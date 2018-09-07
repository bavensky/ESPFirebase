const Config = {}
const Global = {}

Config.appId = 'devSuperman'
Config.appKey = 'ZSi0zWgOXhltsxs'
Config.appSecret = '0rUQNAUSVJRxKC9xzuC1QJ6H6'
Config.topic = '/gearname/topic1'
Config.alias = 'web1'

microgear = Microgear.create({
  key: Config.appKey,
  secret: Config.appSecret,
})

microgear.on('connected', function () {
  console.log('netpie connected')
  microgear.setAlias(Config.alias)
  microgear.subscribe('/gearname/#')
  clearInterval(Global.timer1)
})

microgear.on('present', function (event) {
  console.log(event)
})

microgear.on('absent', function (event) {
  console.log(event)
})

microgear.on('message', function (topic, msg) {
  console.log('on message', topic, msg)
  var weight = JSON.parse(msg)
  if(weight.d.scale) {
  	Global.speak("น้ำหนัก" + (weight.d.scale/1000).toFixed(2) + "กิโลกรัม")	
  }
  
})

function connect_netpie () {
  const startTime = new Date().getTime()
  Global.startMs = startTime
  Global.timeoutMs = startTime + (10 * 1000)
  Global.timer1 = setInterval(function () {
    const currentTime = new Date().getTime()
    if (currentTime > Global.timeoutMs) {
      alert(Config.appId + ' is an invalid appId.')
      clearInterval(Global.timer1)
    }
  }, 100)
  microgear.resettoken(function (err) {
    if (err) {
      console.log('reset token err', err)
    } else {
      microgear.connect(Config.appId)
    }
  })
}
