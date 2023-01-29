from bs4 import BeautifulSoup
from bs4.element import Comment

from urllib.request import urlopen
import cohere

co = cohere.Client("o2KYh1CEVLYwS0ePRO4VmKsIWZuaSuz5cDS1MWjZ")


def tag_visible(element):
    if element.parent.name in ['style', 'script', 'head', 'title', 'meta', '[document]']:
        return False
    if isinstance(element, Comment):
        return False
    return True

def get_text(url):
    page = urlopen(url)
    html = page.read().decode("utf-8")
    soup = BeautifulSoup(html, "html.parser")
    main_soup = soup.find('main')
    total = ""
    for text in main_soup.find_all("p"):
        total += text.get_text()
    return total.split()

'''
def get_text(url):
    page = urlopen(url)
    html = page.read().decode("utf-8")
    soup = BeautifulSoup(html, "html.parser")
    texts = soup.findAll(text=True)
    visible_texts = filter(tag_visible, texts)
    total = u" ".join(t.strip() for t in visible_texts)

    total_list = total.split()
    return total_list

    #text_p = (''.join(s.findAll(text=True)) for s in soup.findAll('p'))
    #return text_p
    #return soup.get_text()'''


def divide_chunks(l, n):
    # looping till length l
    for i in range(0, len(l), n):
        yield l[i:i + n]


def create_summary(l):
    divided = list(divide_chunks(l, 100))
    l_sum = []
    for i in divided:
        i = " ".join(i)
        sum = summarize(i)
        print(sum)
        l_sum.append(sum)
    total_sum = " ".join(l_sum)
    return total_sum


def summarize(string):
    string = string + "\n In summary: \n --"

    response = co.generate(
        model='xlarge',
        prompt=string,
        max_tokens=40,
        temperature=1,
        stop_sequences=["--"])

    summary = response.generations[0].text
    return summary
