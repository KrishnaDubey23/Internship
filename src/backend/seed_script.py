import json
import requests

API = "http://127.0.0.1:8000"

def seed_internships():
    with open('seed.json','r', encoding='utf-8') as f:
        import json
        import requests
        from pathlib import Path

        API = "http://127.0.0.1:8000"

        ROOT = Path(__file__).resolve().parent
        SEED_FILE = ROOT / "seed.json"


        def seed_internships():
            if not SEED_FILE.exists():
                print(f"seed file not found at {SEED_FILE}")
                return
            with open(SEED_FILE, 'r', encoding='utf-8') as f:
                items = json.load(f)
            try:
                resp = requests.post(f"{API}/seed_internships", json=items, timeout=10)
                print('seed_internships status', resp.status_code, resp.text)
            except requests.exceptions.RequestException as e:
                print('Failed to POST seed_internships:', e)


        def create_test_user():
            user = {
                "name": "Test User",
                "email": "testuser@example.com",
                "skills": ["python", "ml"],
                "interests": ["nlp", "recommendation"],
                "education": "BSc Computer Science",
                "experience_years": 1
            }
            try:
                resp = requests.post(f"{API}/register", json=user, timeout=10)
                print('register status', resp.status_code, resp.text)
            except requests.exceptions.RequestException as e:
                print('Failed to POST register:', e)


        if __name__ == '__main__':
            seed_internships()
            create_test_user()
