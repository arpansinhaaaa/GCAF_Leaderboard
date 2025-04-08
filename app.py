from flask import Flask, render_template, request, jsonify
import csv
from datetime import datetime
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    if file:
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        with open(filepath, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            data = list(reader)

        for row in data:
            row['# of Skill Badges Completed'] = int(row['# of Skill Badges Completed'])
            row['# of Arcade Games Completed'] = int(row['# of Arcade Games Completed'])
            row['# of Trivia Games Completed'] = int(row['# of Trivia Games Completed'])
            row['# of Lab-free Courses Completed'] = int(row['# of Lab-free Courses Completed'])
            row['Total'] = (
                row['# of Skill Badges Completed'] +
                row['# of Arcade Games Completed'] +
                row['# of Trivia Games Completed'] +
                row['# of Lab-free Courses Completed']
            )

        data.sort(key=lambda x: x['# of Skill Badges Completed'], reverse=True)

        for i, row in enumerate(data, start=1):
            row['Rank'] = i

        return jsonify(data)
    return jsonify({'error': 'No file uploaded'}), 400

if __name__ == '__main__':
    app.run(debug=True)