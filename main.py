from flask import Flask, render_template, redirect, request, url_for, session
import data_manager

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/premier-league')
def premier_league():
    return render_template('premier_league.html')


@app.route('/bundesliga')
def bundesliga():
    return render_template('bundesliga.html')


@app.route('/seria-a')
def seria_a():
    return render_template('seria_a.html')


@app.route('/la-liga')
def la_liga():
    return render_template('laliga.html')


@app.route('/registration', methods=['POST', 'GET'])
def register():
    if request.method == 'GET':
        return render_template('registration.html')
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        plain_text_password = request.form.get('password')
        repeat_password = request.form.get('password-repeat')
        hashed_pw = data_manager.hash_password(plain_text_password)
        verified_pw = data_manager.verify_password(repeat_password, hashed_pw)
        if verified_pw:
            success_state = data_manager.register(username, email, hashed_pw)
            if success_state:
                return redirect('/')
            else:
                success = False
                return render_template('registration.html', success=success)
        else:
            verified = False
            return render_template('registration.html', verified=verified)


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    if request.method == 'POST':
        username = request.form['uname']
        password = request.form['pwd']
        user_data = data_manager.get_user_data(username)
        if not user_data:
            success = False
            return render_template('login.html', success=success)
        else:
            verified_pw = data_manager.verify_password(password, user_data['password'])
            if verified_pw:
                session['username'] = username
                session['user_id'] = user_data['id']
                return redirect('/')
            else:
                success = False
                return render_template('login.html', success=success)


@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('user_id', None)
    return redirect('/')


if __name__ == '__main__':
    app.run()
