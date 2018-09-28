import connection
from psycopg2 import sql, IntegrityError
import bcrypt


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


@connection.connection_handler
def register(cursor, username, password):
    try:
        cursor.execute(
            sql.SQL("""INSERT INTO users
                       VALUES (DEFAULT, %(username)s, %(password)s)
                        """), {'username': username, 'password': password})
        return True
    except IntegrityError:
        return False


@connection.connection_handler
def get_user_data(cursor, username):
    cursor.execute("""SELECT id, username, password
                   FROM users
                   WHERE username=%(username)s 
                    """, {'username': username})

    data = cursor.fetchone()
    return data
