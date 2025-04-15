const axios = require("axios");

const sendOTPViaSMS = async (phone, otp) => {
  const apiUrl = `https://sms.autobysms.com/app/smsapi/index.php?key=45FA150E7D83D8&campaign=0&routeid=9&type=text&contacts=${phone}&senderid=SMSSPT&msg=Your OTP is ${otp} SELECTIAL&template_id=1707166619134631839`;
  return axios.post(apiUrl);
};

module.exports = sendOTPViaSMS;
