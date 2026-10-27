"""Exercise rendered routes, canonical URLs, missing pages and local font bytes."""
import subprocess, time, urllib.request, urllib.error, re
from html.parser import HTMLParser
from pathlib import Path

opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
base = 'http://127.0.0.1:3091'
server = subprocess.Popen(['node', 'node_modules/next/dist/bin/next', 'start', '-H', '127.0.0.1', '-p', '3091'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
def fetch(path):
    with opener.open(base + path, timeout=2) as r:
        return r.status, r.read()
try:
    for attempt in range(12):
        try:
            fetch('/')
            break
        except (OSError, urllib.error.URLError):
            time.sleep(.25)
    routes = {'/':'BIRANE DIAW', '/projects':'Smart-Grid UFLS Relay', '/research':'DOI forthcoming', '/experience':'Menara', '/about':'EMSI Rabat', '/contact':'diawbirane10@gmail.com', '/research/grid-forming-vsm-hvdc-bess':'ABSTRACT'}
    for slug in ['ufls-smartgrid','wave-energy-conversion','railway-traction-25kv','digital-twin-liion-battery','digital-twin-electric-drive']:
        routes['/projects/'+slug] = 'IN THIS PROJECT'
    for path, expected in routes.items():
        status, raw = fetch(path)
        html=raw.decode()
        assert status == 200 and expected in html, path
        canonical = re.search(r'<link rel="canonical" href="([^"]+)"', html).group(1)
        assert canonical.rstrip('/') == ('https://b-diaw.com'+path).rstrip('/'), 'canonical '+path
        assert '<h1' in html and 'site-header' in html and 'site-footer' in html, 'layout '+path
        print('PASS',path)
    # Guard the experience lost when the old DOM-injected supplement was replaced.
    home = fetch('/')[1].decode()
    experience = fetch('/experience')[1].decode()
    for expected in ['PASEL', 'NEA Kolda', 'Aug — Sep 2026', 'Menara Préfa']:
        assert expected in experience, 'Missing experience: '+expected
    class Anchors(HTMLParser):
        def __init__(self, html):
            super().__init__()
            self.ids, self.links = [], []
            self.feed(html)
        def handle_starttag(self, tag, attrs):
            attrs = dict(attrs)
            if 'id' in attrs: self.ids.append(attrs['id'])
            if tag == 'a' and 'href' in attrs: self.links.append(attrs['href'])
    target = Anchors(experience)
    assert len(target.ids) == len(set(target.ids)), 'Duplicate experience anchor'
    mission_ids = ['s4e-2026', 'menara-2026', 's4e-2024', 's4e-2023']
    for anchor in mission_ids:
        assert anchor in target.ids, 'Missing mission anchor: '+anchor
        assert '/experience#'+anchor in Anchors(home).links, 'Missing home experience link: '+anchor
    for href in target.links:
        if href.startswith('#'):
            assert href[1:] in target.ids, 'Broken experience link: '+href
    assert 'software' in Anchors(fetch('/about')[1].decode()).ids
    print('PASS restored S4E experience, home links, unique anchors and direct navigation')
    for font in Path('public/fonts/virage').glob('*.woff2'):
        status, raw=fetch('/fonts/virage/'+font.name)
        assert status==200 and raw[:4]==b'wOF2',font.name
        print('PASS font',font.name)
    for path in ['/does-not-exist','/projects/does-not-exist','/about/extra']:
        try:
            fetch(path)
            raise AssertionError('Expected 404: '+path)
        except urllib.error.HTTPError as e:
            assert e.code==404
            print('PASS 404',path)
    print('All rendered route and font checks passed.')
finally:
    server.terminate()
    server.wait(timeout=10)
