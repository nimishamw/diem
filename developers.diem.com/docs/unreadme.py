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

import re
import json

IMAGE_BLOCK_RE = re.compile(r"(\[block:.*?])(.*?)(\[/block])", re.DOTALL | re.MULTILINE)


def read(filename):
    with open(filename, "r") as f:
        return f.read()


def process_image_blocks(doc):
    while True:
        res = IMAGE_BLOCK_RE.search(doc)
        if not res:
            return doc
        data = json.loads(res.group(2))
        if len(data["images"]) > 1:
            print(data)
            print("RUH ROH!")
            exit(1)

        image = data["images"][0]
        url = image["image"][0]
        image_name = image["image"][1]
        caption = image.get("caption")

        result = f"![{caption or image_name}]({url})"
        if caption:
            result += f'\n<small className="figure">{caption}</small>\n'

        doc = doc[:res.span()[0]] + result + doc[res.span()[1]:]


filepath = "/Users/confidential/diem/diem/developers.diem.com/docs/readme.com/v1.1.1/Basics/basics-events.md"

doc = read(filepath)

print(doc)
doc = process_image_blocks(doc)
print("=\n="*10)
print(doc)