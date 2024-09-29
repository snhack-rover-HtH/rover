import json
import time
from awscrt import mqtt, io
from awsiot import mqtt_connection_builder
import RPi.GPIO as GPIO
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# AWS configuration
ENDPOINT = os.getenv('ENDPOINT')
CLIENT_ID = os.getenv('CLIENT_ID')
TOPIC = os.getenv('TOPIC')
CERT = os.getenv('CERT')
KEY = os.getenv('KEY')
ROOT_CA = os.getenv('ROOT_CA')

GPIO.setmode(GPIO.BCM)

# Motor pins from .env
MOTORS = {
    'right': {
        'in1': int(os.getenv('RIGHT_MOTOR_IN1')),
        'in2': int(os.getenv('RIGHT_MOTOR_IN2')),
        'en': int(os.getenv('RIGHT_MOTOR_EN'))
    },
    'left': {
        'in1': int(os.getenv('LEFT_MOTOR_IN1')),
        'in2': int(os.getenv('LEFT_MOTOR_IN2')),
        'en': int(os.getenv('LEFT_MOTOR_EN'))
    }
}

# Initialize GPIO
for motor in MOTORS.values():
    GPIO.setup(motor['in1'], GPIO.OUT)
    GPIO.setup(motor['in2'], GPIO.OUT)
    GPIO.setup(motor['en'], GPIO.OUT)
    motor['pwm'] = GPIO.PWM(motor['en'], 1000)
    motor['pwm'].start(100)

def set_pwm(pwm_int):
    for motor in MOTORS.values():
        motor['pwm'].ChangeDutyCycle(pwm_int)

def set_motor(motor, direction):
    if direction == 'backward':
        GPIO.output(motor['in1'], GPIO.HIGH)
        GPIO.output(motor['in2'], GPIO.LOW)
    elif direction == 'forward':
        GPIO.output(motor['in1'], GPIO.LOW)
        GPIO.output(motor['in2'], GPIO.HIGH)
    else:  # stop
        GPIO.output(motor['in1'], GPIO.LOW)
        GPIO.output(motor['in2'], GPIO.LOW)

def move_rover(action):
    if action == 'forward':
        set_pwm(100)
        set_motor(MOTORS['right'], 'forward')
        set_motor(MOTORS['left'], 'forward')
    elif action == 'backward':
        set_pwm(100)
        set_motor(MOTORS['right'], 'backward')
        set_motor(MOTORS['left'], 'backward')
    elif action == 'left':
        set_pwm(60)
        set_motor(MOTORS['left'], 'forward')
        set_motor(MOTORS['right'], 'backward')
    elif action == 'right':
        set_pwm(60)
        set_motor(MOTORS['left'], 'backward')
        set_motor(MOTORS['right'], 'forward')
    elif action == 'stop':
        set_motor(MOTORS['right'], 'stop')
        set_motor(MOTORS['left'], 'stop')
    print(f"Rover action: {action}")

def on_connection_interrupted(connection, error, **kwargs):
    print(f"Connection interrupted. error: {error}")

def on_connection_resumed(connection, return_code, session_present, **kwargs):
    print(f"Connection resumed. return_code: {return_code} session_present: {session_present}")

def on_message_received(topic, payload, **kwargs):
    try:
        message = json.loads(payload.decode())
        print(f"Received message from topic '{topic}': {message}")
        move_rover(message['action'])
    except Exception as e:
        print(f"Error processing message: {e}")

# Set up MQTT connection
event_loop_group = io.EventLoopGroup(1)
host_resolver = io.DefaultHostResolver(event_loop_group)
client_bootstrap = io.ClientBootstrap(event_loop_group, host_resolver)

mqtt_connection = mqtt_connection_builder.mtls_from_path(
    endpoint=ENDPOINT,
    cert_filepath=CERT,
    pri_key_filepath=KEY,
    client_bootstrap=client_bootstrap,
    ca_filepath=ROOT_CA,
    client_id=CLIENT_ID,
    clean_session=False,
    keep_alive_secs=6
)

print(f"Connecting to {ENDPOINT} with client ID '{CLIENT_ID}'...")
connect_future = mqtt_connection.connect()
connect_future.result()
print("Connected!")

print(f"Subscribing to topic '{TOPIC}'...")
subscribe_future, packet_id = mqtt_connection.subscribe(
    topic=TOPIC,
    qos=mqtt.QoS.AT_LEAST_ONCE,
    callback=on_message_received
)
subscribe_result = subscribe_future.result()
print(f"Subscribed with {str(subscribe_result['qos'])}")

print("Rover is ready to receive commands. Ctrl+C to exit.")

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Disconnecting...")
    disconnect_future = mqtt_connection.disconnect()
    disconnect_future.result()
    GPIO.cleanup()
    print("Disconnected and GPIO cleaned up!")