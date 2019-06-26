const getError = (cause) => {
    switch (cause) {
        case "Busy":
            return {code:486, message:"Máy bận"}
        case "Rejected":
            return {code:403, message:"Từ chối"}
        case "Redirected":
            return {code:300, message:"Đã chuyển hướng"}
        case "Unavailable":
            return {code:480, message:"Không thể dùng được"}
        case "Not Found":
            return {code:404, message:"Không tìm thấy"}
        case "Address Incomplete":
            return {code:484, message:"Địa chỉ không hợp lệ"}
        case "Incompatible SDP":
            return {code:488, message:"SDP không hợp lệ"}
        case "Authentication Error":
            return {code:401, message:"Chưa kết nối đến tổng đài"}
    }
}

export {getError}