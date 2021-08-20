from pathlib import Path
import os
import re
import json

IMAGE_BLOCK_RE = re.compile(r"(\[block:image])(.*?)(\[/block])", re.DOTALL | re.MULTILINE)
PARAMS_BLOCK_RE = re.compile(r"(\[block:parameters])(.*?)(\[/block])", re.DOTALL | re.MULTILINE)
CALLOUT_BLOCK_RE = re.compile(r"(\[block:callout])(.*?)(\[/block])", re.DOTALL | re.MULTILINE)
HTML_BLOCK_RE = re.compile(r"(\[block:html])(.*?)(\[/block])", re.DOTALL | re.MULTILINE)

BASE_PATH = "/Users/confidential/diem/diem/developers.diem.com/docs/move/"


def read(filename):
    with open(filename, "r") as f:
        return f.read()


def write(filename, doc):
    with open(filename, "w") as f:
        return f.write(doc)


def process_image_blocks(doc, filepath):
    image_block_count = 0
    while True:
        res = IMAGE_BLOCK_RE.search(doc)
        if not res:
            return doc, image_block_count

        image_block_count += 1
        data = json.loads(res.group(2))
        try:
            if len(data["images"]) != 1:
                print(data)
                print("RUH ROH!")
                exit(1)
            image = data["images"][0]
            url = image["image"][0]
            image_name = image["image"][1]
            caption = image.get("caption")
        except Exception as e:
            import pdb
            pdb.set_trace()

        result = f"![{caption or image_name}]({url})"
        if caption:
            result += f'\n<small className="figure">{caption}</small>\n'

        doc = doc[:res.span()[0]] + result + doc[res.span()[1]:]


def process_parameter_blocks(doc, filepath):
    parameter_block_count = 0

    def make_row(some_cols):
        row_res = " | ".join(some_cols)
        return f"| {row_res} |"

    while True:
        res = PARAMS_BLOCK_RE.search(doc)
        if not res:
            return doc, parameter_block_count

        parameter_block_count += 1
        try:
            data = json.loads(res.group(2))

            cols = data["cols"]
            rows = data["rows"]

            data = data["data"]

            header = []
            for col in range(cols):
                header.append(data[f"h-{col}"])

            result = [make_row(header), make_row(["----------"] * cols)]

            for row in range(rows):
                row_data = []
                for col in range(cols):
                    row_data.append(data[f"{row}-{col}"].replace("\n", "<br/>"))
                result.append(make_row(row_data))

        except Exception as e:
            import pdb
            pdb.set_trace()
        result = "\n" + "\n".join(result)

        doc = doc[:res.span()[0]] + result + doc[res.span()[1]:]


def process_callout_blocks(doc, filepath):
    callout_block_count = 0
    while True:
        res = CALLOUT_BLOCK_RE.search(doc)
        if not res:
            return doc, callout_block_count

        callout_block_count += 1
        try:
            data = json.loads(res.group(2))

            type = data["type"]
            body = data["body"].replace("\n", "\n<br/>")
            class_name = f"block_note_{type}"
            result = f'<blockquote className="block_note {class_name}">\n **{type.capitalize()}:** {body} \n</blockquote>'

        except Exception as e:
            import pdb
            pdb.set_trace()

        doc = doc[:res.span()[0]] + result + doc[res.span()[1]:]


def process_html_blocks(doc, filepath):
    html_block_count = 0
    while True:
        res = HTML_BLOCK_RE.search(doc)
        if not res:
            return doc, html_block_count

        html_block_count += 1
        try:
            data = json.loads(res.group(2))
            result = data["html"]
        except Exception as e:
            import pdb
            pdb.set_trace()

        doc = doc[:res.span()[0]] + result + doc[res.span()[1]:]


def process_doc(filepath):
    doc = read(filepath)
    (doc, image_block_count) = process_image_blocks(doc, filepath)
    (doc, parameter_block_count) = process_parameter_blocks(doc, filepath)
    (doc, callout_block_count) = process_callout_blocks(doc, filepath)
    (doc, html_block_count) = process_html_blocks(doc, filepath)

    if image_block_count + parameter_block_count + callout_block_count + html_block_count > 0:
        print(f"Processed: {filepath}")

    if image_block_count > 0:
        print(f"  - processed {image_block_count} image blocks")

    if parameter_block_count > 0:
        print(f"  - processed {parameter_block_count} parameters blocks")

    if callout_block_count > 0:
        print(f"  - processed {callout_block_count} callout blocks")

    if html_block_count > 0:
        print(f"  - processed {html_block_count} html blocks")

    write(filepath, doc)


def process_all_docs():
    filepaths = list(Path(BASE_PATH).rglob("*.md"))
    for filepath in filepaths:
        process_doc(filepath)


"""
    category('Diem Reference Wallet', [
      'wallets-and-merchant-stores/diem-reference-wallet',
      'wallets-and-merchant-stores/diem-reference-wallet/reference-wallet-admin-dash',
      'wallets-and-merchant-stores/diem-reference-wallet/reference-wallet-local-mob',
      'wallets-and-merchant-stores/diem-reference-wallet/reference-wallet-local-web',
      'wallets-and-merchant-stores/diem-reference-wallet/reference-wallet-public-demo',
      'wallets-and-merchant-stores/diem-reference-wallet/reference-wallet-set-up-modules',
    ]),
"""


def category_izer(full_path, remove_prefix):
    filepaths = list(Path(full_path).rglob("*.md"))

    hierarchy = {}

    for filepath in filepaths:
        relpath = str(filepath).replace(remove_prefix, "")
        node = hierarchy
        for elem in relpath.split("/"):
            if ".md" in elem:
                node["docs"].append(relpath.replace(".md", ""))
            else:
                if elem not in node:
                    node[elem] = {"docs": []}
                node = node[elem]

    print(json.dumps(hierarchy, indent="  "))



if __name__ == "__main__":
    category_izer("/Users/confidential/diem/diem/developers.diem.com/docs/move",
                  "/Users/confidential/diem/diem/developers.diem.com/docs/")
    # process_all_docs()
    # fp = "/Users/confidential/diem/diem/developers.diem.com/docs/move/move-basic-concepts.md"
    # doc = read(fp)
    # (doc, c) = process_html_blocks(doc, fp)
    # print(c)
    # print(doc)
