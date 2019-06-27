const getError = (cause) => {
    switch (cause) {
        case "Busy":
            return {code:486, message:"Máy bận"}
        case "Rejected":
            return {code:403, message:"Từ chối"}
        case "Redirected":
            return {code:300, message:"Đã chuyển hướng"}
        case "Unavailable":
            return {code:480, message:"Khách không bắt máy"}
        case "Not Found":
            return {code:404, message:"Không tìm thấy"}
        case "Address Incomplete":
            return {code:484, message:"Địa chỉ không hợp lệ"}
        case "Incompatible SDP":
            return {code:488, message:"SDP không hợp lệ"}
        case "Authentication Error":
            return {code:401, message:"Chưa kết nối đến tổng đài"}

        case "Canceled":
            return {code:200, message:"Huỷ cuộc gọi"}
        case "Terminated":
            return {code:200, message:"Tắt cuộc gọi"}
        case "No Answer":
            return {code:200, message:"Không có ai trả lời khách"}
        // Incoming call contains a Expires header and 
        // local user did not answer within the time given in the header. 
        case "EXPIRES":
            return {code:200, message:"Nội dung hết hạn"}
        //An incoming INVITE was replied with 2XX status code
        //but no ACK was received.
        case "No ACK":
            return {code:200, message:"Máy khách không thể kết nối tổng đài"}
        //An in-dialog request received a 408 or 481 SIP error.
        case "Dialog Error":
            return {code:200, message:"Hiện tải không thể kết nối tổng đài"}
        //Local user denied media access when prompted for audio/video devices.
        case "User Denied Media Access":
            return {code:200, message:"Nhân viên không mở microphone"}
        case "Received SDP is wrong.":
            return {code:200, message:"Nhận âm thanh lỗi"}
        case "RTP Timeout":
            return {code:200, message:"Kết thúc do mất tín hiệu"}
    }
}

export {getError}