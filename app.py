from flask import Flask, render_template, request, jsonify
import sqlite3
import os

app = Flask(__name__)
DB_NAME = "database.db"

def init_db():
    """Initializes the SQLite database and creates the table if it doesn't exist."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            mobile TEXT NOT NULL,
            location TEXT NOT NULL,
            requirement TEXT,
            status TEXT DEFAULT 'Pending'
        )
    ''')
    conn.commit()
    conn.close()

# Initialize database immediately on setup
init_db()

@app.route('/')
def home():
    """Renders the client booking page."""
    return render_template('main.html')

# --- NEW: Added missing website navigation page routes ---

@app.route('/gallery')
def gallery():
    """Renders the gallery page showing your portfolio."""
    return render_template('gallery.html')

@app.route('/services')
def services():
    """Renders the salon services and pricing structures page."""
    return render_template('service.html')

@app.route('/about')
def about():
    """Renders the about studio background details story page."""
    return render_template('about.html')

@app.route('/contact')
def contact():
    """Renders the store contact info and reach layout details page."""
    return render_template('contact.html')

@app.route('/appointment')
def appointment():
    """Renders the dedicated or independent online booking form interface."""
    return render_template('appointment.html')

# --------------------------------------------------------

@app.route('/api/book', methods=['POST'])
def book_appointment():
    """Handles async AJAX submissions from the frontend form."""
    data = request.get_json()
    
    name = data.get('name')
    email = data.get('email')
    mobile = data.get('mobile')
    location = data.get('location')
    requirement = data.get('requirement')

    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO appointments (name, email, mobile, location, requirement)
            VALUES (?, ?, ?, ?, ?)
        ''', (name, email, mobile, location, requirement))
        conn.commit()
        conn.close()
        return jsonify({"success": True, "message": "Appointment recorded safely!"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/admin')
def admin_dashboard():
    """Fetches all stored database submissions and renders the admin view panel."""
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row  # Enables column fetching by key name
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM appointments ORDER BY id DESC')
    appointments = cursor.fetchall()
    conn.close()
    return render_template('admin.html', appointments=appointments)

if __name__ == '__main__':
    app.run(debug=True)
