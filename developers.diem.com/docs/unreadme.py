from pathlib import Path
import os
import re
import json

IMAGE_BLOCK_RE = re.compile(r"(\[block:image])(.*?)(\[/block])", re.DOTALL | re.MULTILINE)
PARAMS_BLOCK_RE = re.compile(r"(\[block:parameters])(.*?)(\[/block])", re.DOTALL | re.MULTILINE)

BASE_PATH = "/Users/confidential/diem/diem/developers.diem.com/docs/readme.com/"


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


def process_doc(filepath):
    doc = read(filepath)
    (doc, image_block_count) = process_image_blocks(doc, filepath)
    (doc, parameter_block_count) = process_parameter_blocks(doc, filepath)

    if image_block_count + parameter_block_count > 0:
        print(f"Processed: {filepath}")

    if image_block_count > 0:
        print(f"  - processed {image_block_count} image blocks")

    if parameter_block_count > 0:
        print(f"  - processed {parameter_block_count} parameters blocks")

    write(filepath, doc)


def process_all_docs():
    filepaths = list(Path(BASE_PATH).rglob("*.md"))
    for filepath in filepaths:
        process_doc(filepath)


if __name__ == "__main__":
    process_all_docs()
