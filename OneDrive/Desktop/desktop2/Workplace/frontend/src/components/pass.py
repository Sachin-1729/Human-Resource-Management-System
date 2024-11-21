from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import base64

# Load your private key
with open('private.pem', 'r') as key_file:
    private_key = RSA.import_key(key_file.read())

# Base64 decode if needed
encrypted_data = base64.b64decode("Ww6f205xvepjsnGD0Get1dJnDGQiaphdao+XgfsJrVXeOnh1bdC1Bv+ed/Xb0gH0")

# Decrypt with RSA
cipher = PKCS1_OAEP.new(private_key)
decrypted_data = cipher.decrypt(encrypted_data)
print(decrypted_data.decode('utf-8'))
