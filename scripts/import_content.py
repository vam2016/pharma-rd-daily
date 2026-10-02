#!/usr/bin/env python3
"""Validate content v1 and create/revise a Markdown article; no network writes."""
import argparse
import datetime as dt
import json
import re
from pathlib import Path

FORMATS = {"rd": {"daily_brief"}, "statistics": {"research_digest"}, "notes": {"discussion", "study_note"}}
REQUIRED = {"schema_version", "section", "format", "title", "date", "summary", "tags", "body"}
OPTIONAL = {"slug", "updated_at", "update_note"}
HISTORY = "\n\n<!-- content-revisions-v1 -->\n## 修订记录\n"


def require(condition, message):
    if not condition:
        raise ValueError(message)


def timestamp(value):
    require(isinstance(value, str), "日期必须为 ISO 8601 字符串")
    parsed = dt.datetime.fromisoformat(value)
    require(parsed.utcoffset() == dt.timedelta(hours=8), "日期须包含 +08:00 时区")
    return parsed


def metadata(text, field):
    front = text.split("---", 2)
    require(len(front) == 3 and not front[0].strip(), "旧文章缺少 front matter")
    match = re.search(r"^" + re.escape(field) + r":\s*(.*?)\s*$", front[1], re.M)
    require(match is not None, "旧文章缺少 " + field)
    value = match.group(1)
    if value.startswith('"'):
        return json.loads(value)
    return value.strip("'")


def import_content(data, root, revise=False, dry_run=False):
    require(isinstance(data, dict), "输入应为 JSON 对象")
    require(REQUIRED <= data.keys() and data.keys() <= REQUIRED | OPTIONAL, "字段不完整或含未知字段")
    require(type(data["schema_version"]) is int and data["schema_version"] == 1, "仅支持 schema_version 1")
    section = data["section"]
    require(isinstance(section, str) and section in FORMATS, "未知栏目")
    require(data["format"] in FORMATS[section], "内容类型与栏目不匹配")
    for field, limit in (("title", 200), ("summary", 1200), ("body", None)):
        value = data[field]
        require(isinstance(value, str) and value.strip(), field + " 不能为空")
        require(limit is None or len(value) <= limit, field + " 过长")
    tags = data["tags"]
    require(isinstance(tags, list) and all(isinstance(t, str) and t.strip() and len(t) <= 60 for t in tags), "tags 应为非空文本数组")
    require(len(tags) == len(set(tags)), "tags 不能重复")
    date = timestamp(data["date"])
    require(date <= dt.datetime.now(dt.timezone(dt.timedelta(hours=8))), "不能发布未来日期的文章")
    day = date.strftime("%Y-%m-%d")
    require(not re.search(r"<\s*(script|iframe|object|embed)\b|\son\w+\s*=|javascript\s*:|\{[%{]", data["body"], re.I), "正文包含可执行 HTML 或 Liquid 标记，请移除后导入")
    require(not any(marker in data["body"] for marker in ("<!-- content-revisions-v1 -->",)), "正文不可包含保留的修订标记")
    slug = data.get("slug")
    if section == "notes":
        require(isinstance(slug, str) and len(slug) <= 100 and re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug), "笔记 slug 仅允许小写字母、数字与连接符")
        relative = Path("_posts/notes") / f"{day}-{slug}.md"
        permalink = f"/notes/{slug}/"
    elif section == "statistics":
        require(slug is None, "方法精选无需 slug")
        relative = Path("_posts/statistics") / f"{day}-statistical-methods.md"
        permalink = f"/statistics/{day}/"
    else:
        require(slug is None, "日报无需 slug")
        relative = Path("_posts") / f"{day}-daily.md"
        permalink = f"/briefs/{day}/"
    root = Path(root).resolve()
    path = root / relative
    require(path.resolve().is_relative_to(root), "目标路径越界")
    if section == "notes":
        require(not any(p != path for p in path.parent.glob(f"????-??-??-{slug}.md")), "此 slug 已有文章，请保留原始日期进行修订")
    history = ""
    if path.exists():
        require(revise, "文章已存在；修订请使用 --revise")
        require(data.get("update_note", "").strip() and data.get("updated_at"), "修订必须有 updated_at 与 update_note")
        updated = timestamp(data["updated_at"])
        require(updated > date and updated <= dt.datetime.now(dt.timezone(dt.timedelta(hours=8))), "修订时间必须晚于原始日期且不能在未来")
        old = path.read_text(encoding="utf-8")
        require(timestamp(metadata(old, "date")) == date, "修订不可改变原始日期")
        require(metadata(old, "section") == section, "修订不可改变栏目")
        require(metadata(old, "permalink") == permalink, "修订不可改变 URL")
        if re.search(r"^updated_at:", old.split("---", 2)[1], re.M):
            require(updated > timestamp(metadata(old, "updated_at")), "修订时间必须晚于上次修订")
        history = old.split(HISTORY, 1)[1].rstrip() if HISTORY in old else ""
        history += f"\n- {updated.isoformat()}：{data['update_note']}"
    else:
        require(not revise, "目标文章不存在，不能修订")
        require("updated_at" not in data and "update_note" not in data, "新文章不能带修订元数据")
    header = {k: data[k] for k in ("title", "date", "section", "format", "summary", "tags")}
    header["permalink"] = permalink
    if slug:
        header["slug"] = slug
    if revise:
        header.update(updated_at=data["updated_at"], update_note=data["update_note"])
    text = "---\n" + "\n".join(k + ": " + json.dumps(v, ensure_ascii=False) for k, v in header.items()) + "\n---\n\n" + data["body"].strip() + "\n"
    if history:
        text += HISTORY + history.strip() + "\n"
    if not dry_run:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding="utf-8")
    return str(relative)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--root", type=Path, default=Path("."))
    parser.add_argument("--revise", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    try:
        data = json.loads(args.input.read_text(encoding="utf-8"))
        print(import_content(data, args.root, args.revise, args.dry_run))
    except (ValueError, TypeError, OSError) as error:
        parser.exit(1, f"导入失败：{error}\n")


if __name__ == "__main__":
    main()
