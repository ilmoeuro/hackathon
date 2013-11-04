#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from wsgiref.simple_server import make_server

leaderboard = []
header = b"""<!DOCTYPE html>
<html>
    <head>
        <title>Leaderboard</title>
        <meta charset="utf-8" />
    </head>
    <body>
    <pre>"""
footer = b"""</pre></body></html>"""

def app(environ, start_response):
        global leaderboard
        status = '200 OK'
        headers = [('Content-type', 'text/html')]
        qs = environ['QUERY_STRING']

        if qs:
            name, score = qs.split("-")
            leaderboard.append((name, score))
            leaderboard.sort(key=lambda x: int(x[1]), reverse=True)
            leaderboard = leaderboard[:5]

        print(leaderboard)
        start_response(status, headers)
        ret = [header]
        ret += ["{0}: {1}\n".format(k,v).encode('utf-8')
                for (k,v) in leaderboard]
        ret += [footer]
        return ret


make_server('', 6060, app).serve_forever()
