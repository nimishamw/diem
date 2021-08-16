"""

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b01f98b-events-fig1.svg",
        "events-fig1.svg",
        267,
        150,
        "#ffffff"
      ],
      "caption": "Figure 1.0 EventHandle and event streams in the Diem Framework"
    }
  ]
}
[/block]

to

![Figure 1.1 Lifecycle of a Transaction](/img/docs/validator-sequence.svg)
<small className="figure">Figure 1.1 Lifecycle of a Transaction</small>
"""

from pathlib import Path
import os
import re
import json

IMAGE_BLOCK_RE = re.compile(r"(\[block:image])(.*?)(\[/block])", re.DOTALL | re.MULTILINE)

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
        except Exception:
            import pdb
            pdb.set_trace()

        result = f"![{caption or image_name}]({url})"
        if caption:
            result += f'\n<small className="figure">{caption}</small>\n'

        doc = doc[:res.span()[0]] + result + doc[res.span()[1]:]


def process_doc(filepath):
    doc = read(filepath)
    (doc, image_block_count) = process_image_blocks(doc, filepath)

    if image_block_count > 0:
        print(f"Processed: {filepath}")
    if image_block_count > 0:
        print(f"  - processed {image_block_count} image blocks")
    write(filepath, doc)


def process_all_docs():
    filepaths = list(Path(BASE_PATH).rglob("*.md"))
    for filepath in filepaths:
        process_doc(filepath)


if __name__ == "__main__":
    process_all_docs()
