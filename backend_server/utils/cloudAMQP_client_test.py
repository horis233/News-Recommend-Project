from cloudAMQP_client import CloudAMQPClient

CloudAMQP_URL = "amqp://lrpcfuxl:NxHVm8A01SVn3DH_sYfJk11l3HANpzJL@emu.rmq.cloudamqp.com/lrpcfuxl"
TEST_QUEUE_NAME = "test"

def test_basic():
  client = CloudAMQPClient(CloudAMQP_URL,TEST_QUEUE_NAME )

  sentMsg = {"test":"test"}
  client.sendMessage(sentMsg)
  client.sleep(10)

  reveivedMsg = client.getMessage()

  assert sentMsg == reveivedMsg
  print("test_basic passed!")

if __name__ == "__main__":
  test_basic()
