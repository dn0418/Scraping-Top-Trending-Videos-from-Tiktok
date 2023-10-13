import requests

API_KEY = "M2KRRSS-PEEMJDV-NY3MF2A-KQVZ1BQ"


def upload(file_name, file_format):
    endpoint = f"https://app.ayrshare.com/api/media/uploadUrl?fileName={file_name}&contentType={file_format}"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
    }

    response = requests.get(endpoint, headers=headers)

    if response.status_code != 200:
        return None

    json_data = response.json()

    with open(f"uploads/{file_name}", 'rb') as file:
        file_data = file.read()

        headers = {
            "Content-Type": json_data["contentType"],
        }

        response = requests.put(
            json_data["uploadUrl"], headers=headers, data=file_data)
        if response.status_code != 200:
            # throw an error
            return None

        return json_data
