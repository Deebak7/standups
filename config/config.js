require('dotenv').config();

CONFIG={};

CONFIG.db_host=process.env.db_host;
CONFIG.db_name=process.env.db_name;
CONFIG.db_port=process.env.db_port;
CONFIG.db_user=process.env.db_user;
CONFIG.db_password=process.env.db_password;
CONFIG.db_dialect=process.env.db_dialect;
CONFIG.google_client_id=process.env.google_client_id
CONFIG.google_client_secret=process.env.google_client_secret
CONFIG.google_callback_url=process.env.google_callback_url
CONFIG.facebook_client_id=process.env.facebook_client_id
CONFIG.facebook_client_secret=process.env.facebook_client_secret
CONFIG.facebook_callback_url=process.env.facebook_callback_url

CONFIG.jwt_encryption='1818'
CONFIG.jwt_expiration=1000000000
CONFIG.secretKey='1234'
CONFIG.user='deebakcr7@gmail.com'
CONFIG.pass='txoaemyxtawuestu'

