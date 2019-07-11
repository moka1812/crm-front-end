const getError = (cause) => {
    switch (cause) {
        case "Busy":
            return "Máy bận"
        case "Rejected":
            return "Từ chối"
        case "Redirected":
            return "Đã chuyển hướng"
        case "Unavailable":
            return "Khách không bắt máy"
        case "Not Found":
            return "Không tìm thấy"
        case "Address Incomplete":
            return "Địa chỉ không hợp lệ"
        case "Incompatible SDP":
            return "SDP không hợp lệ"
        case "Authentication Error":
            return "Chưa kết nối đến tổng đài"
        case "Canceled":
            return "Huỷ cuộc gọi"
        case "Terminated":
            return "Tắt cuộc gọi"
        case "No Answer":
            return "Không có ai trả lời khách"
        // Incoming call contains a Expires header and 
        // local user did not answer within the time given in the header. 
        case "EXPIRES":
            return "Nội dung hết hạn"
        //An incoming INVITE was replied with 2XX status code
        //but no ACK was received.
        case "No ACK":
            return "Máy khách không thể kết nối tổng đài"
        //An in-dialog request received a 408 or 481 SIP error.
        case "Dialog Error":
            return "Hiện tại không thể kết nối tổng đài"
        //Local user denied media access when prompted for audio/video devices.
        case "User Denied Media Access":
            return "Nhân viên không mở microphone"
        case "Received SDP is wrong.":
            return "Nhận âm thanh lỗi"
        case "RTP Timeout":
            return "Kết thúc do mất tín hiệu"
    }
}

export {getError}