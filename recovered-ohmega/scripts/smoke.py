"""Exercise rendered routes, canonical URLs, missing pages and local font bytes."""
import subprocess, time, urllib.request, urllib.error
from pathlib import Path

opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
base = 'http://127.0.0.1:3091'
server = subprocess.Popen(['node', 'node_modules/next/dist/bin/next', 'start', '-p', '3091'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
def fetch(path):
    with opener.open(base + path, timeout=20) as r:
        return r.status, r.read()
try:
    for attempt in range(60):
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
        assert 'https://b-diaw.com'+path+'"' in html, 'canonical '+path
        assert '<h1' in html and 'site-header' in html and 'site-footer' in html, 'layout '+path
        print('PASS',path)
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
