import http.server
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    port = 8746
    server = http.server.HTTPServer(("127.0.0.1", port), http.server.SimpleHTTPRequestHandler)
    print(f"Serving on {port}")
    server.serve_forever()
