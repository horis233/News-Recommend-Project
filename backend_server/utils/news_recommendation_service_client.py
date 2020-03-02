import jsonrpclib

URL = "http://localhost:5050/"

client = jsonrpclib.Server(URL)

def getPreferenceForUser(userId):
    preference = client.getPreferenceForUser(userId)
    print("Preference list: %s" % str(preference))
    return preference
