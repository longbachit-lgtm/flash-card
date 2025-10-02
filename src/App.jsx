import React, { useState } from "react";
import feather from "feather-icons";
import { useEffect } from "react";
import parse from "html-react-parser";

const cardDecks = {
  business: [
    "<b>🏆 Chiến Thắng Trò Chơi Bên Trong</b> <br><br> <p>🔮 BÙA – CHÚ :</p><br>  Dán xung quanh nhắc nhở mình, thể hiện năng lượng cao và đọc thường xuyên<br><br> “THAY VÌ NÓI TÔI NGU LẮM → TÔI GIỎI LẮM.NẾU NHẬN MÌNH NGU MÌNH SẼ DỪNG HÀNH ĐỘNG  ",
    "<b>🌟 Khó khăn & Thành công</b> <br> <br> Khó khăn là bài kiểm tra của cuộc sống. Người thành công xem khó khăn như thử thách, kẻ bỏ cuộc thì coi thử thách là khó khăn.<br> <br> 💡 Kết luận: Khó khăn chỉ đo năng lực, không phải để ngăn bạn tiến lên.",
    "<b>🔑 Không thể hành động mà không có chiến lược rõ ràng</b> <br><br> Trước khi hành động → cần tư duy &amp; xây dựng chiến lược phù hợp.<br><br> 💡 Nguyên tắc: Đặt mục tiêu phải hoàn thành, hoàn thành không xong không ăn không uống không nghỉ.",
    "<b>🌱 Cách đạt được mục tiêu hiệu quả</b> <br><br> 1. <b>Biết mình mong muốn gì</b><br> Xác định rõ mục tiêu trước khi bắt đầu học.<br> Mục tiêu càng cụ thể thì định hướng càng rõ ràng.<br><br> 2. <b>Hằng ngày kiểm tra, đo lường và đánh giá</b><br> Đặt thói quen phản chiếu (review) mỗi ngày.<br> Biết hôm nay mình học được gì, còn thiếu gì.<br><br> 3. <b>Càng làm nhiều lần bao nhiêu, càng giỏi bấy nhiêu</b><br> Thành công không đến từ số lượng việc bạn làm,<br> mà từ số lần lặp lại.",
    "<b>🚀 HÀNH ĐỘNG BIẾN TƯ DUY THÀNH THỰC TẾ</b> <br><br> 1. <b>🔑 Nguyên tắc</b><br> Chiến lược + Hành động cụ thể = Kết quả.<br> Nếu không hành động → chiến lược chỉ là lý thuyết.<br><br> 2. <b>🔄 Thực hiện liên tục</b><br> Lặp đi lặp lại đến khi thành công.<br> Khi bắt đầu sẽ có những suy nghĩ ngăn cản (“Không làm được đâu”).<br> 👉 Nhưng nếu kiên trì thực hiện 1000 lần, kết quả chắc chắn sẽ đến.<br><br> 3. <b>📌 Ứng dụng thực tế</b><br> Ví dụ: Nhóm Zalo đã tạo danh sách khách hàng tiềm năng ngay sau khi học mô hình này.<br>",
    "<b>🌸 LÒNG BIẾT ƠN</b> <br><br> 1. <b>📚 Sách tham khảo – Nguồn sức mạnh tinh thần</b><br> The Magic<br> The Power<br> The Hero<br> 👉 Những cuốn sách giúp tăng cường sức mạnh tinh thần và động lực hành động.<br><br> 2. <b>💡 Thông điệp</b><br> Điều gì mình biết ơn → Vũ trụ hiểu là mình cần thêm.<br> Điều gì mình vô ơn → Mình sẽ mất nó đi.<br><br> 3. <b>🏁 Kết luận</b><br> 👉 Không có gì có thể ngăn cản bạn nếu bạn có:<br> Tư duy đúng 🧠<br> Chiến lược rõ ràng 🎯<br> Hành động kiên trì 🚀<br>",
    "<b>🎯 XÁC ĐỊNH THỊ TRƯỜNG MỤC TIÊU</b> <br><br> <img src='https://trello.com/1/cards/68c52f358ac7e7ed580eadb2/attachments/68c53073b4df4129be9ac67c/download/image.png' /><br><br> 1. <b>🔑 Nguyên tắc</b><br> Đây là bài toán lâu dài, có thể trải dài suốt cuộc đời.<br> Chọn nhóm khách hàng đủ lớn để phục vụ, nhưng đủ nhỏ để không bị cạnh tranh khốc liệt → giúp bạn trở thành số 1 trong lĩnh vực đó.<br><br> 2. <b>🧭 Cách tiếp cận TRÒN</b><br> Dựa vào hành vi & sở thích của đối tượng khách hàng → chọn nhóm sẵn sàng sử dụng dịch vụ để lấp đầy khoảng trống.<br> Tham khảo: Sách Thiết Kế Giải Pháp Giá Trị.<br><br> Vẽ chân dung khách hàng tại nơi làm việc thường xuyên:<br> - Vẽ đặc tính khách hàng.<br> - Chia hình tròn thành 3 phần:<br> &nbsp;&nbsp;&nbsp;• Pain → Nỗi đau.<br> &nbsp;&nbsp;&nbsp;• Gain → Niềm sung sướng khi thoát khỏi nỗi đau.<br> &nbsp;&nbsp;&nbsp;• WANT ( JOBS ) → Công việc khách hàng muốn hoàn thành + trải nghiệm trong cuộc sống.<br><br> Viết nỗi đau & niềm sung sướng vào ô tương ứng → mỗi khách hàng sẽ có một hình tròn riêng.<br><br> 3. <b>🟩 Mô hình Vuông</b><br> Vuông = Sản phẩm/Dịch vụ của chúng ta.<br> Như một viên thuốc giảm đau, chứa yếu tố tạo sung sướng.<br><br> Công việc hằng ngày của người kinh doanh:<br> - Liên tục lắng nghe.<br> - Liên tục thấu hiểu.<br> - Từ đó tạo và tìm ra sản phẩm/dịch vụ phù hợp.<br><br> 4. <b>📌 Bắt đầu từ nhu cầu</b><br> Không bán sản phẩm cụ thể.<br> Thị trường cần gì → ta đáp ứng nhu cầu đó.<br> Ví dụ: Thời điểm dịch Covid → nhu cầu là khẩu trang, nước rửa tay.<br><br> 5. <b>🔮 BÙA DÁN TƯỜNG</b><br> “KHÔNG BÁN SẢN PHẨM – HÃY GIẢI QUYẾT NỖI ĐAU VÀ MANG LẠI NIỀM SUNG SƯỚNG CHO KHÁCH HÀNG.”<br>",
    "<b>🎯 XÁC ĐNH THỊ TRƯỜNG MỤC TIÊU</b><br><img src='https://trello.com/1/cards/68c6667bedcd95f753586736/attachments/68c66771d7372e23c5108eec/download/image.png' />",
    "<b>📊 LẬP HỒ SƠ KHÁCH HÀNG & THỊ TRƯỜNG</b><br><br> 1. <b>👥 KHÁCH HÀNG</b><br> - Muốn thuyết phục ai → Phải làm hồ sơ về họ (Nỗi đau, Sung sướng, Mong muốn).<br> - Có sản phẩm giải quyết nhu cầu.<br> - Người bán hàng giỏi là người vẽ được nhiều hồ sơ khách hàng.<br> - Không chờ đợi rồi mới kinh doanh → Chuyển đổi nhanh rồi đưa sản phẩm khác.<br><br> <b>🤝 Xây dựng quan hệ trước</b><br> • Phải xây dựng mối quan hệ thân tình trước.<br> • Trao giá trị trước, khách mua hàng là do họ tự chọn.<br> • Có những mối quan hệ phải xây dựng 20 năm.<br><br> 2. <b>📦 SẢN PHẨM</b><br> - Tập hợp các vấn đề.<br> - Có sản phẩm giải quyết vấn đề đó.<br> - Khách hàng sẵn sàng trả tiền.<br><br> 👉 Nếu chỉ thỏa mãn 1 hay 2 tiêu chí thì không được, phải thỏa mãn đủ 3 tiêu chí.<br> 👉 Thiết kế sản phẩm dựa trên nhu cầu khách hàng.<br> 👉 Dù họ mua hay không mua vẫn phải giữ mối quan hệ 2 chiều.<br><br> 3. <b>🌱 CẦU THỊ & KHIÊM TỐN</b><br> - Luôn xin lời giới thiệu → Đây là yếu tố rất quan trọng để có thêm khách hàng.<br>",
    "<b>🤝 XÂY DỰNG NIỀM TIN</b><br><br> 1. <b>🔗 Nói về điểm chung</b><br> - Thể thao, âm nhạc, phim, sở thích, thói quen sống.<br> - Càng nhiều “điểm chung” → càng dễ mở lòng.<br><br> 2. <b>🪞 Mô phỏng (Mirroring)</b><br> - Họ nói chậm → mình chậm, họ hào hứng → mình năng lượng hơn.<br> - Họ ăn mặc lịch sự → mình cũng chỉnh chu.<br> - Giúp tạo cảm giác “người này giống mình”.<br><br> 3. <b>🎁 Tặng quà nhỏ</b><br> - Không cần giá trị cao, chỉ cần có tâm & đúng sở thích.<br> - Ví dụ: cuốn sách, món ăn vặt, hoặc một câu chuyện giá trị.<br><br> 4. <b>👂 Lắng nghe chủ động</b><br> - Gật đầu, nhắc lại từ khóa của họ, đặt câu hỏi mở.<br> - Ví dụ: “Nếu tôi hiểu đúng thì anh đang muốn… đúng không?”<br><br> <b>📌 KẾ HOẠCH HÀNH ĐỘNG</b><br><br> 1. <b>✍️ Vẽ “Vuông – Tròn” & Đầu tư sách</b><br> - Vẽ sơ đồ giải pháp giá trị theo 2 dạng:<br> &nbsp;&nbsp;&nbsp;• Vuông = Sản phẩm/dịch vụ anh đang có.<br> &nbsp;&nbsp;&nbsp;• Tròn = Nhu cầu, mong muốn, nỗi đau của khách hàng.<br> - Giao điểm Vuông – Tròn = Giải pháp giá trị độc đáo.<br> - Mua & đọc sách: <i>Value Proposition Design (Thiết kế giải pháp giá trị)</i>.<br> 👉 Đây là bước nền tảng tư duy để xây dựng sản phẩm/dịch vụ phù hợp.<br><br> 2. <b>📜 Thiết kế “Bản Tuyên Bố” (Declaration)</b><br> Soạn 5 bản tuyên bố quan trọng:<br> - Về bản thân → Tôi là ai? Giá trị & sứ mệnh của tôi?<br> - Về khách hàng lý tưởng → Họ là ai? Họ khao khát điều gì?<br> - Về danh sách khách hàng tiềm năng → Tôi đang có bao nhiêu, tôi sẽ mở rộng thế nào?<br> - Về cuộc hẹn → Tôi luôn sẵn sàng tạo ra những buổi gặp gỡ ý nghĩa.<br> - Về mối quan hệ với khách hàng → Xây dựng trên nền tảng tin tưởng, win–win, lâu dài.<br> 👉 Có thể viết dạng “Tuyên ngôn” ngắn gọn, mạnh mẽ, đọc mỗi sáng.<br><br> 3. <b>💌 Viết thư tay cho thầy Long</b><br> - Lấy cảm hứng từ sách <i>The Magic</i> (Rhonda Byrne).<br> - Cấu trúc thư:<br> &nbsp;&nbsp;&nbsp;• Lời cảm ơn chân thành vì sự dẫn dắt, truyền cảm hứng.<br> &nbsp;&nbsp;&nbsp;• Một kỷ niệm/ảnh hưởng thực tế từ thầy.<br> &nbsp;&nbsp;&nbsp;• Lời chúc tốt đẹp + khẳng định tình cảm, sự trân trọng.<br> 👉 Thư tay có sức mạnh kết nối tình cảm sâu sắc, hơn hẳn email hay tin nhắn.<br>",
    "<b>💞 TỬ HUYỆT CẢM XÚC</b><br><br> 1. <b>6 NHU CẦU CƠ BẢN</b><br> <img src='https://trello.com/1/cards/68c67e3cd68b0f35e99acedd/attachments/68c67e5757957738df069a5c/download/image.png' /><br> <img src='https://trello.com/1/cards/68c67e3cd68b0f35e99acedd/attachments/68c686e2cc9124a6ee49456c/download/image.png' /><br><br> 👉 Việc đàm phán cần phát hiện các tử huyệt của đối tác và thỏa mãn nhu cầu của họ.<br><br> 2. <b>🚘 Phương tiện sang trọng</b><br> - Mời đối tác bằng chiếc xe sang trọng, … trước khi đi vào đàm phán.<br><br> 3. <b>🔮 Phong thủy</b><br> - 4 - 8 - 12 là Tam hợp.<br> - Mệnh Hỏa hợp Thổ, Hỏa sinh Thổ.<br>",
    "<b>🤝 XÂY DỰNG QUAN HỆ THÂN TÌNH CHẤT LƯỢNG</b><br><br> 1. <b>🎯 Tư Duy Cốt Lõi</b><br> - Người cho đi là người chiến thắng → Cho đi giá trị trước khi nhận lại.<br> - Hiện diện + Uy tín = Tiền.<br> - Khách hàng chỉ mua / gặp / hợp tác với người họ thích và tin tưởng.<br> - Không phải “gặp là chốt đơn” → Người mua muốn mua, không muốn bị bán.<br> - Bán hàng = Giúp đỡ & phục vụ, không phải ép mua.<br><br> 2. <b>🔑 Quy Trình 4 Bước</b><br> - Tạo khách hàng tiềm năng → Làm họ biết mình.<br> - Hẹn gặp → Tạo lý do hợp lý để gặp.<br> - Xây dựng quan hệ thân tình & tin cậy → Làm họ thích mình.<br> - Kỹ thuật chốt / đề xuất → Khi đã có sự tin tưởng.<br><br> 3. <b>🧩 3 Nhóm Trò Chơi</b><br> <b>Trò chơi tâm trí</b>: Tập trung cho đi giá trị, xây dựng niềm tin, hiểu thế giới quan của người khác.<br> <b>Trò chơi chiến lược</b>: Tạo list người cần kết nối, hẹn gặp bằng lý do hợp lý, chốt mối quan hệ.<br> <b>Trò chơi hành động</b>: Chỉ có kết quả khi làm nhiều lần. Hằng ngày điền “mục vuông tròn” để theo dõi hoạt động kết nối.<br><br> 4. <b>🤝 7 Kỹ Thuật Xây Dựng Quan Hệ Thân Tình & Tin Cậy</b><br> - <b>GAINS Formula</b>: Goals (Mục tiêu), Achievements (Thành tựu), Interests (Sở thích), Network (Mối quan hệ), Skills (Kỹ năng).<br> - <b>Mô phỏng hành vi + ngôn từ</b>: “Monkey See – Monkey Do”. Ngồi, đứng, cử chỉ, tốc độ nói giống họ.<br> - <b>Đưa giá trị / giải pháp</b>: Luôn mang đến giải pháp thực tế.<br> - <b>Làm điều tốt bất ngờ</b>: Quà nhỏ nhưng đúng sở thích (sách, món ăn vặt, thư tay…).<br> - <b>Lắng nghe sâu</b>: Gật đầu, nhắc lại từ khóa, đặt câu hỏi mở. “Nếu tôi hiểu đúng thì anh đang muốn… đúng không?”.<br> - <b>Hài hước</b>: Giúp tạo cảm giác thoải mái và gần gũi.<br><br> 👉 <b>Quy tắc vàng</b>: Đối xử với người khác như cách bạn muốn họ đối xử với mình.<br> 👉 <b>Quy tắc bạch kim</b>: Đối xử với người khác theo cách họ muốn được đối xử.<br><br> 5. <b>📅 Bài Tập Hành Động</b><br> - Trong 1 tuần, xây dựng quan hệ với ít nhất 1 người/ngày.<br> - Chủ động kết nối lại quan hệ cũ: người nhà, tài xế, shipper…<br> - Quan tâm thật sự đến người khác, không đặt nặng lợi nhuận.<br> - Đếm số người “thích mình” mỗi tuần.<br> - Bài tập đặc biệt: thử xây dựng lại mối quan hệ với người từng là “kẻ thù”.<br>",
    "<b>🤝 ĐÀM PHÁN</b><br><br> <b>Những tuyệt chiêu đàm phán</b><br><br> 1. <b>❓ Hỏi</b><br> - Hỏi bất kỳ điều gì, hỏi trước khi người bán hỏi bạn.<br> - Người có năng lượng cao hơn sẽ là người chiến thắng.<br><br> 2. <b>🔗 Tương đồng</b><br> - Tương đồng góc nhìn: Đừng ngồi đối diện trong đàm phán, chọn góc 90 độ hoặc ngồi cùng 1 phía.<br> - Nhớ tên gọi và dùng tên gọi để tạo sự thân thuộc.<br> - Nói về điều họ quan tâm: âm nhạc, golf, nhiếp ảnh…<br> - Hỏi, lắng nghe, quan sát, luyện tập nhiều hơn.<br><br> 3. <b>📌 Tạo lý do</b><br> - Tạo bất kỳ lý do gì.<br> Ví dụ:<br> &nbsp;&nbsp;&nbsp;• Sản phẩm không hoàn hảo: “Bao nhiêu cho cuốn sách bị sờ gáy này?”<br> &nbsp;&nbsp;&nbsp;• “Bao nhiêu cho bức tượng sứt đuôi này?”<br> &nbsp;&nbsp;&nbsp;• “Bao nhiêu cho bông hoa nở hết này?”<br> - Bạn không thích sản phẩm này… → Càng nhu cầu thấp thì quyền lực càng cao.<br> - Lý do mua nhiều: 10, 100, 1000 cái thì giá bao nhiêu?<br> - Cơ hội kinh doanh trong tương lai: “Anh bớt em chút, sau em giới thiệu thêm người mua.”<br><br> 4. <b>💪 Quyết tâm không là người đi đầu</b><br> - Không ra giá trước, để người bán ra giá.<br> - Đưa ra mức giá thấp hơn mong muốn, sau đó thương lượng dần.<br> - Nếu họ không chịu thì hỏi: “Giá tốt nhất anh bán được là bao nhiêu?”<br><br> 5. <b>⚖️ Tạo cạnh tranh</b><br> - Ở chỗ khác bán … tiền, vậy anh bán bao nhiêu?<br> - Người bán sẽ đưa ra giá tốt nhất cho bạn.<br><br> 6. <b>🛡️ Luôn có phương án B</b><br> - Đừng bao giờ quá yêu thích một sản phẩm.<br> - Luôn chuẩn bị để chiến thắng bằng phương án khác.<br> - <b>CẢM XÚC LÊN CAO → TRÍ TUỆ ĐI XUỐNG.</b><br> 👉 Luôn sẵn sàng cho phương án B.<br>",
    "<b>📅 HẸN GẶP</b><br><br> <b>6 Nguyên tắc tăng tỷ lệ hẹn gặp & chốt khách</b><br><br> 1. <b>Giảm rủi ro cho khách</b><br> - Rủi ro lớn nhất của khách: mất thời gian nhưng không nhận được giá trị.<br> - Cách làm:<br> &nbsp;&nbsp;&nbsp;• Chọn thời điểm ít ảnh hưởng.<br> &nbsp;&nbsp;&nbsp;• Hẹn ngắn hơn dự kiến.<br> &nbsp;&nbsp;&nbsp;• Nếu hẹn lần 1 bị từ chối → đặt ngay cuộc hẹn 2, ít rủi ro hơn.<br> &nbsp;&nbsp;&nbsp;• Khi khách nói “Bận” → Chuyển thành “Chỉ 5 phút thôi, anh vẫn làm việc tiếp được.”<br> Ví dụ: “Không sao anh ạ, em biết tất cả chúng ta đều bận. Vậy lúc nào tiện nhất cho anh, chỉ 5 phút thôi là được.”<br><br> 2. <b>Đặt ra kết quả rõ ràng trong cuộc hẹn</b><br> - Giúp khách thấy họ nhận được gì sau khi gặp.<br> Ví dụ:<br> &nbsp;&nbsp;&nbsp;• “Chỉ 5 phút thôi, anh sẽ hiểu toàn cảnh thị trường BĐS.”<br> &nbsp;&nbsp;&nbsp;• “Gặp 10 phút thôi, anh sẽ thấy cơ hội đầu tư cụ thể.”<br><br> 3. <b>Đặt mục tiêu cam kết hành động</b><br> - Cuộc hẹn không chỉ để trò chuyện mà còn có cam kết tiếp theo: ký hợp đồng, xem hàng, thử sản phẩm…<br> - Luôn chuẩn bị sẵn một bước tiếp theo để khách đồng ý ngay.<br><br> 4. <b>Xin lời giới thiệu</b><br> - Mỗi cuộc hẹn cũng là cơ hội mở rộng khách hàng.<br> Cách nói: “Anh thấy cơ hội này phù hợp thì giới thiệu giúp em cho 1-2 người bạn nhé.”<br><br> 5. <b>Tăng “điểm chạm” trước cuộc hẹn</b><br> - Điểm chạm = mọi tương tác trước khi gặp → giúp khách quen mặt & tin tưởng.<br> - Bao gồm: nhắn tin, gọi điện, comment MXH, gửi email, gửi tài liệu, cảm ơn, chúc mừng.<br> Ví dụ:<br> &nbsp;&nbsp;&nbsp;• “Chào anh Cường, tôi là Long, cảm ơn anh đã cho tôi cơ hội nhé.”<br> &nbsp;&nbsp;&nbsp;• “Chào chị Thắm, tôi có nhắn anh Cường 3h, chị nhắn giúp tôi nhé.”<br><br> 6. <b>Chăm sóc liên tục</b><br> - Nguyên tắc: “Chăm sóc cho tới khi họ mua hoặc… chết” 😄<br> - Một khách hàng được chăm sóc đúng cách sẽ không rời bỏ bạn.<br> - Hãy cho họ điều họ muốn: thông tin, hỗ trợ, quà, mối quan hệ…<br> - Luôn duy trì liên hệ, kể cả khi họ chưa mua.<br><br> <img src='https://trello.com/1/cards/68c682932b068f1a856b2cf3/attachments/68c6865ef1ed90b14fd9afbf/download/image.png' /> <br><b>🔑 NGUYÊN LÝ CHUNG</b><br> - Có cớ hợp lý: Quà, thông tin, báo cáo, trải nghiệm.<br> - Cài thông tin liên quan đến nhu cầu của khách → họ thấy “có lợi cho mình” thì dễ đồng ý.<br> - Thêm yếu tố cảm xúc hoặc khẩn trương → giúp khách hành động ngay, tránh trì hoãn.<br><br> <b>Ví dụ cài cắm thông tin</b><br> - “Nhân tiện em gửi anh cái sổ đỏ xem, mảnh này đẹp lắm. Lúc này cũng là thời điểm tốt để bàn sâu hơn.”<br> - “Có dịp anh ghé qua, em cho anh xem bản báo cáo thị trường mới nhất, chắc anh sẽ thấy nhiều cơ hội hay.”<br>",
    "<b>🤝 XÂY DỰNG QUAN HỆ THÂN TÌNH CHẤT LƯỢNG</b><br><br> 1. <b>🎯 Tư Duy Cốt Lõi</b><br> - Người cho đi là người chiến thắng → Cho đi giá trị trước khi nhận lại.<br> - Hiện diện + Uy tín = Tiền.<br> - Khách hàng chỉ mua / gặp / hợp tác với người họ thích và tin tưởng.<br> - Không phải “gặp là chốt đơn” → Người mua muốn mua, không muốn bị bán.<br> - Bán hàng = Giúp đỡ & phục vụ, không phải ép mua.<br><br> 2. <b>🔑 Quy Trình 4 Bước</b><br> - Tạo khách hàng tiềm năng → Làm họ biết mình.<br> - Hẹn gặp → Tạo lý do hợp lý để gặp.<br> - Xây dựng quan hệ thân tình & tin cậy → Làm họ thích mình.<br> - Kỹ thuật chốt / đề xuất → Khi đã có sự tin tưởng.<br><br> 3. <b>🧩 3 Nhóm Trò Chơi</b><br> - <b>Trò chơi tâm trí</b>: Tập trung cho đi giá trị, xây dựng niềm tin bản thân, hiểu thế giới quan của người khác.<br> - <b>Trò chơi chiến lược</b>: Tạo list người cần kết nối, hẹn gặp bằng lý do hợp lý, chốt đơn hoặc mối quan hệ.<br> - <b>Trò chơi hành động</b>: Chỉ có kết quả khi làm nhiều lần. Hằng ngày điền “mục vuông tròn” để theo dõi hoạt động kết nối.<br><br> 4. <b>🤝 7 Kỹ Thuật Xây Dựng Quan Hệ Thân Tình & Tin Cậy</b><br> - <b>GAINS Formula</b>: Goals (Mục tiêu), Achievements (Thành tựu), Interests (Sở thích), Network (Mối quan hệ), Skills (Kỹ năng).<br> - <b>Mô phỏng hành vi + ngôn từ</b>: “Monkey See – Monkey Do”. Ngồi, đứng, cử chỉ, tốc độ nói giống họ.<br> - <b>Đưa giá trị / giải pháp</b>: Luôn mang đến giải pháp thực tế.<br> - <b>Làm điều tốt bất ngờ</b>: Quà nhỏ đúng sở thích (sách, món ăn vặt, thư tay…).<br> - <b>Lắng nghe sâu</b>: Cho khách cơ hội nói, quan tâm thật sự. Gật đầu, nhắc lại từ khóa, đặt câu hỏi mở.<br> - <b>Hài hước</b>: Tạo cảm giác thoải mái và gần gũi.<br><br> 👉 <b>Quy tắc vàng</b>: Đối xử với người khác như cách bạn muốn họ đối xử với mình.<br> 👉 <b>Quy tắc bạch kim</b>: Đối xử với người khác theo cách họ muốn được đối xử.<br><br> 5. <b>📅 Bài Tập Hành Động</b><br> - Trong 1 tuần, xây dựng quan hệ với ít nhất 1 người/ngày.<br> - Chủ động kết nối lại quan hệ cũ: người nhà, tài xế, shipper…<br> - Quan tâm thật sự đến người khác, không đặt nặng lợi nhuận.<br> - Đếm số người “thích mình” mỗi tuần.<br> - Bài tập đặc biệt: Thử xây dựng lại mối quan hệ với người từng là “kẻ thù”.<br>",
    "<b>📲 CHIẾN LƯỢC – MẠNG XÃ HỘI ZALO</b><br><br> 1. <b>🎣 Mồi câu</b><br> - Nuôi dưỡng 1 cộng đồng đủ lớn.<br> - Cần có sản phẩm/dịch vụ thực sự giá trị để chuyển giao trên Internet.<br> - Phải có điều mới, quà tặng, kết hợp Internet và Referral.<br> - Ví dụ: Tặng 1 món quà khi giới thiệu thêm 3 người.<br><br> 2. <b>🔄 Chiến lược “Vòng ảnh hưởng”</b><br> - Xác định người có thể giới thiệu sản phẩm/dịch vụ đến đúng đối tượng.<br><br> 3. <b>📈 Chiến lược “Leo thang”</b><br> - Tiếp cận từ những mối quan hệ nhỏ.<br> - Mở rộng dần để tiếp cận khách hàng lớn hơn.<br><br>  <b>🚀 HÀNH ĐỘNG</b><br> - Mỗi chiến lược cần đi kèm hành động cụ thể. Nếu không hành động, chiến lược chỉ là lý thuyết.<br> - Lặp đi lặp lại đến khi thành công.<br> 👉 Khi bắt đầu sẽ có suy nghĩ ngăn cản (“Không làm được đâu”). Nhưng nếu kiên trì 1000 lần, chắc chắn sẽ có kết quả.<br> - Ứng dụng ngay trong thực tế: Nhóm Zalo đã tạo danh sách khách hàng tiềm năng ngay sau khi học mô hình này.<br>"
  ],
  finance: [
    "Tiết kiệm tiền là kiếm tiền. - Benjamin Franklin",
    "Đừng tiết kiệm những gì còn lại sau khi chi tiêu, hãy chi tiêu những gì còn lại sau khi tiết kiệm.",
    "Giá trị thực sự của đồng tiền nằm ở cách bạn sử dụng nó.",
    "Đa dạng hóa đầu tư để giảm thiểu rủi ro.",
    "Lãi kép là kỳ quan thứ 8 của thế giới. - Albert Einstein",
  ],
  motivation: [
    // "<b>🧘 ĐỊNH TÂM</b><br> <br> <div class='flex justify-center'> <img class='text-center' src='https://trello.com/1/cards/680f61863e7eb3d65df30294/attachments/680f62492f1ebddb37a84189/download/image.png' /></div> <br> ✅ Định tâm = Giữ tâm trí không xao lãng.<br> ✅ Khi định tâm, bạn không còn thấy vấn đề – chỉ còn thấy giải pháp.<br><br> <b>Định Tâm:</b><br> - Định tâm nghề thì nghề không có vấn đề.<br> - Định tâm với người, người không có vấn đề.<br> - Định tâm là trong mọi hoàn cảnh cũng hướng về mục đích.<br><br> 👉 Khi tâm của chúng ta Định thì mọi việc học tập trong lộ trình này đều không có vấn đề.<br><br> <b>📖 Câu chuyện minh họa:</b><br> - Một SV hỏi cha: “Nếu con đang hút thuốc mà con cầu nguyện về Chúa có được không?” → Cha nói: <i>Tốt con.</i><br> - Một SV khác hỏi: “Nếu con đang cầu nguyện về Chúa mà nghĩ về việc hút thuốc thì có được không?” → Cha nói: <i>Không được.</i><br><br> ➡ Bài học: Một người bận rộn hàng vạn công việc nhưng tâm vẫn đặt vào việc học, hướng tới Giàu Toàn Diện → vẫn được đánh giá cao hơn người rảnh rỗi nhưng tâm trí lại tơ tưởng chuyện khác.<br><br> <b>📌 Ví dụ:</b><br> - Người vợ định tâm xem chồng là bạn đời trọn kiếp → Ít mâu thuẫn.<br> - Học viên định tâm vào hành trình học → Không phân tâm bởi thị phi bên ngoài.<br><br> <b>👉 Bài học cốt lõi:</b><br> Muốn giỏi bất cứ lĩnh vực nào – đầu tiên phải <b>Định tâm</b> với nó.<br>",
    // "<b>⚡ 2.0 GIA TỐC + TOÀN TÂM TOÀN Ý <br> <br>   <div class='flex justify-center'> <img class='text-center' src='https://trello.com/1/cards/680f62c0b5836f8bebccd533/attachments/680f63b25513c3ecaf522d83/download/image.png' /></div> </b><br><br> <b>Phương pháp học tập cốt lõi của WiT</b><br><br> 1. <b>📍 2.1. Phương pháp Gia Tốc</b><br> 🔥 Gia tốc = Học nhanh gấp nhiều lần bình thường bằng cách:<br> - Cô lập bối cảnh.<br> - Tập trung cao độ trong 6–8 tháng.<br> → Tốc độ chuyển hóa bằng 10–20 năm trải nghiệm thông thường.<br><br> 📌 Ví dụ:<br> - Bình thường mất 10 năm để thay đổi tư duy → Gia tốc chỉ vài tháng.<br> - Một khóa học nội tâm = Tinh hoa mấy chục năm trải nghiệm.<br><br> 👉 <b>Bài học:</b> Toàn tâm toàn ý học tập → Kết quả bùng nổ trong thời gian cực ngắn.<br><br> 2. <b>📍 2.2. Toàn Tâm Toàn Ý – Công thức bứt phá mọi giới hạn</b><br> 🔥 Nếu trong 6–8 tháng bạn toàn tâm toàn ý, bạn có thể:<br> - Sức khỏe mạnh mẽ như người sắt.<br> - Trí tuệ sắc bén như học giả.<br> - Giao tiếp xuất sắc như nhà diễn thuyết.<br> - Kiểm soát cảm xúc tốt như nhà tâm lý.<br> - Nội tâm bình an, không bị ảnh hưởng bởi tiêu cực.<br><br> 📌 <b>Bài học:</b><br> “Tập trung 100% năng lượng vào mục tiêu → Thành tựu gấp trăm lần bình thường.”<br>",
    // "<b>📘 3.0 THỤ ĐẮC – NGHỆ THUẬT HỌC TẬP TỰ NHIÊN & ĐỈNH CAO</b><br><br> 1. <b>Thụ Đắc – Cách học để ghi nhớ sâu và chuyển hóa thật</b><br> 🔹 Thụ đắc = Học tự nhiên, không gồng ép, không cần cố nhớ, kiến thức tự thấm sâu.<br> 🔹 Học bằng trải nghiệm sống động thay vì chỉ lý thuyết.<br> 🔹 Thụ đắc = Học xong → Lập tức thực hành – chia sẻ – ứng dụng.<br> 🔹 Học xong, phải nói lại – giảng lại – áp dụng → mới nhớ lâu và biến nó thành của mình.<br><div class='flex justify-center'> <img class='text-center' src='https://trello.com/1/cards/680f63844a72df4edcf5de4c/attachments/680f648f68824d0ca44436ae/download/image.png' /></div><br>  📌 Ví dụ:<br> - Học xong → Quay video nói lại → Hiểu sâu và nhớ lâu.<br> - Giảng lại cho người khác → Tri thức khắc sâu vĩnh viễn.<br><br> 🍎 Câu chuyện:<br> - Thầy học tiếng Anh hoài không giao tiếp được.<br> - Sau tìm ra khái niệm “Thụ đắc ngôn ngữ”: Trẻ con sinh ra trong gia đình đa ngôn ngữ sẽ tự hấp thụ được cả 2 thứ tiếng.<br> - Người lớn vì suy nghĩ, dính mắc quá nhiều nên cản trở việc thụ đắc.<br><br> 👉 <b>Bài học:</b> Học mà không thực hành = Quên nhanh. Thực hành ngay = Ghi nhớ sâu + Chuyển hóa nội tâm.<br><br>   2. <b>Thụ Đắc Khác Gì Với Học Thông Thường?</b><br><br><div class='flex justify-center'> <img class='text-center' src='https://trello.com/1/cards/680f63844a72df4edcf5de4c/attachments/680f6633338978e9f4e37d2f/download/image.png' /></div><br> - Học thông thường = Ghi nhớ tạm thời, dễ quên.<br> - Thụ đắc = Kiến thức trở thành phản xạ tự nhiên, khó quên, dùng được ngay.<br><br>   3. <b>Bước Thụ Đắc Kiến Thức Hiệu Quả</b><br><br><div class='flex justify-center'> <img class='text-center' src='https://trello.com/1/cards/680f63844a72df4edcf5de4c/attachments/681c107b508568d903bf8fc9/download/image.png' /></div><br> ➡️ <b>THỤ ĐẮC = HAM MUỐN TỘT CÙNG TRỞ THÀNH + XÓA BỎ RÀO CẢN</b><br><br> ✅ <b>Bước 1: Ham Muốn Tột Cùng Trở Thành</b><br> - Muốn học nhanh → Phải có lý do đủ lớn.<br> - Khi khao khát mạnh mẽ → Não bộ tự động ghi nhớ.<br> 📌 Ví dụ: Người bị buộc phải sống ở nước ngoài → Học ngoại ngữ nhanh như gió.<br><br> ✅ <b>Bước 2: Xóa Bỏ Rào Cản Nhận Thức</b><br> - Không tự dán nhãn “Tôi không giỏi”, “Tôi không làm được”.<br> - Tin rằng: “Mình học được – chỉ cần đúng phương pháp.”<br> 📌 Ví dụ: Tin mình giỏi Toán → Não bộ mở ra khả năng tiếp nhận kiến thức.<br><br> ✅ <b>Bước 3: Đắm Mình Trong Môi Trường Phù Hợp</b><br> - Học từ môi trường thực tế, gần gũi người giỏi hơn mình.<br> - Quan sát – Bắt chước – Hành động liên tục.<br> 📌 Ví dụ: Muốn tự tin → Ở gần người tự tin → Học cách nói chuyện, ánh mắt, cử chỉ.<br><br> 👉 <b>Bài học:</b> “Bạn là trung bình cộng của môi trường bạn sống.”<br><br>   4. <b>3 Cách Ứng Dụng Thực Tế Để Thành Công</b><br> 1️⃣ Gia Tốc – Học nhanh gấp nhiều lần (6 tháng tập trung > 10 năm tản mạn).<br> 2️⃣ Thụ Đắc – Học tự nhiên qua trải nghiệm, lặp lại không cần cố nhớ.<br> 3️⃣ Kiến Tạo Môi Trường Thành Công – Giao du với người giỏi, học cách họ tư duy và hành động.<br><br> 📌 Ví dụ:<br> - Học giao tiếp = luyện các cuộc trò chuyện thực tế.<br> - Muốn thành công kinh doanh → Gần gũi doanh nhân thành công.<br><br>   <b>✅ Kết Luận & Hành Động Ngay</b><br> - Muốn học nhanh – hiệu quả → Thụ đắc kiến thức qua môi trường thực tế.<br> - Muốn thu hút cơ hội → Xây dựng và duy trì môi trường sống tích cực.<br> - Muốn xuất sắc → Ở gần – học hỏi – thực hành theo người giỏi hơn mình.<br><br> 📌 <b>Hành động ngay:</b> 👉 Chọn 1 kỹ năng bạn khao khát giỏi → Tìm môi trường phù hợp → Đắm mình vào nó ngay hôm nay! 🚀<br>",
    // "<b>⚡ 4.0 TẦN SỐ RUNG ĐỘNG NĂNG LƯỢNG</b><br> <div class='flex justify-center'> <img class='text-center' src='https://trello.com/1/cards/680f640f0e5a7653c72d5f81/attachments/680f64454cca1db54f2d2b77/download/image.png' /></div><br> 🔹 Tần số rung động cao → Làm ít mà hiệu quả nhiều.<br> 🔹 Tần số rung động thấp → Làm nhiều mà kết quả ít.<br><br> 📌 Ví dụ:<br> - Người tích cực → Một ngày bằng người khác cả tháng.<br> - Người tiêu cực → Cả năm không bằng người khác một tuần.<br><br> 👉 <b>Bài học:</b><br> Muốn đi nhanh – hãy nâng năng lượng trước.<br> Tâm thái tích cực = Kích hoạt tần số rung động cao.<br>",
    //  "<b>⚡ 5.0 CHUYÊN GIA TƯ VẤN HUẤN LUYỆN NỘI TÂM</b><br> <div class='flex justify-center'> <img class='text-center' src='https://trello.com/1/cards/680f92e5709244814144953b/attachments/680f92f3540040af70c528ab/download/image.png' /></div> <div class='flex justify-center'> <img class='text-center' src='https://trello.com/1/cards/680f92e5709244814144953b/attachments/680f948a421b1380e11c7131/download/image.png' /></div>",
    //  "<b>🔄 THÀNH – TRỤ – HOẠI – DIỆT</b><br><br><div class='flex justify-center'> <img class='text-center' src='https://trello.com/1/cards/681c2fd017ba27dcb1c2f145/attachments/681c302909182a8e0c36b397/download/image.png' /></div> <br>🔹 Mọi thứ trong cuộc sống đều trải qua: Sinh ra → Phát triển → Suy tàn → Biến mất.<br> 🔹 Lý do con người thất bại:<br> ✅ Khi đạt được thành công, họ dừng lại, không tiếp tục phát triển.<br> ✅ Khi cảm thấy “đủ rồi”, họ không còn cố gắng → Dẫn đến sự suy tàn.<br><br> 📌 Ví dụ:<br> - Tình yêu suy giảm sau kết hôn vì nhiều người nghĩ 'đã cưới nhau rồi thì không cần giữ lửa nữa'.<br> - Một người giàu có nhưng ngừng học hỏi → Dần dần mất hết tài sản.<br><br> 👉 <b>Bài học:</b><br> Luôn duy trì tâm thế khởi đầu – <i>“Như thuở ban đầu”</i> – để tránh rơi vào vòng Hoại - Diệt.<br> ",
    //  "<b>💡 LÝ DO KHẮC CỐT GHI TÂM</b><br><br><div class='flex justify-center'> <img class='text-center' src='https://trello.com/1/cards/681c2fd017ba27dcb1c2f145/attachments/681c2fdbd097453940821869/download/image.png' /></div><br> - Biết lý do vì sao mình mở mắt (lý do không nhất thiết phải vĩ đại) → tăng tuổi thọ ngay lập tức.<br> - Muốn thay đổi kết quả, không nhất thiết phải đi qua chuỗi: Suy nghĩ → Thói quen → Kết quả.<br> 👉 Chỉ cần có <b>Lý do khắc cốt ghi tâm</b>, rõ hình mình mong muốn → Thói quen và kết quả sẽ tự động hình thành.<br><br> 📌 Ví dụ:<br> - Một người không thể dậy sớm nhiều năm, nhưng khi có con nhỏ → tự động thức dậy sớm mà không cần ép buộc.<br> - Khi tìm thấy một mục tiêu đủ lớn → không cần gồng để duy trì động lực.<br><br> 👉 <b>Bài học:</b><br> Muốn tạo thói quen mới? Hãy tìm một <b>lý do đủ lớn và đủ khát khao</b>!<br> ",

    //  "<b>📖 TÂM THÁI HỌC TẬP</b><br><br><div class='flex justify-center'> <img class='text-center' src='https://trello.com/1/cards/681ec8f479b553d6483423ed/attachments/681ec9ebf38c29409453f6f0/previews/preview/download/image.webp' /></div><br> 1. <b>Vì một người học một điểm vì vạn người học vạn điểm</b><br><br> 2. <b>🌿 Tâm Thái Học Tập</b><br> - Tâm an vui thì học dễ vào.<br> - Dùng lý trí dễ mắc kẹt – Dùng trí tuệ thì học tự nhiên, trôi chảy.<br><br> <b>VĂN – TƯ – TU</b>:<br> - <b>VĂN</b>: Nghe học, chưa cần tư duy.<br> - <b>TƯ</b>: Học xong mới tư duy, chọn lọc để hành.<br> - <b>TU</b>: Thực hành cái hay và phù hợp.<br><br> 👉 Học trong sự thoải mái, hứng thú → tiếp nhận vô hạn.<br><br> 3. <b>🧭 Định Vị Bản Thân</b><br> - Bạn định vị mình là ai → bạn sẽ học với tâm thế của người đó.<br> - Nếu định vị mình là chuyên gia tư vấn huấn luyện nội tâm → học sẽ đơn giản hơn.<br> - Nếu định vị mình là người có giá trị → sẽ dễ dàng thu hút người khác hơn.<br><br> 👉 <b>Bài học:</b> Muốn là ai, hãy định vị mình là người đó trước.<br>",
    "<b>🌿 LÝ THẲNG KHÍ PHẢI MỀM – PHI LÝ THẲNG KHÍ TRÁNG</b><br><br> <div class='flex justify-center'><img class='text-center' src='https://trello.com/1/cards/681d79bfd954b8bc2275aed8/attachments/681d79c0d954b8bc2275aeff/previews/preview/download/image.webp' /></div><br><br> - Thấy niềm tin yếu → có thể la lên một chút để tăng niềm tin.<br> - Khi đã tự tin → giữ sự mềm mại; nếu quá cứng nhắc, người khác sẽ xa lánh.<br><br> 🔑 <b>Bài Học:</b><br> - Khi bạn cảm thấy mình <i>không thể</i> → nhất định phải muốn.<br> - Khi bạn thật sự muốn → nhất định có thể.<br>",

  ],
};



function App() {
  const [flippedCards, setFlippedCards] = useState([false, false, false]);
  const [currentMessages, setCurrentMessages] = useState(["", "", ""]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeDeck, setActiveDeck] = useState("business");

  // NEW: modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (htmlString) => {
    setModalContent(htmlString);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const flipCard = (index) => {
    if (!flippedCards[index]) {
      const deck = cardDecks[activeDeck];
      const randomIndex = Math.floor(Math.random() * deck.length);
      const newMessages = [...currentMessages];
      newMessages[index] = deck[randomIndex];
      setCurrentMessages(newMessages);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    const newFlipped = [...flippedCards];
    newFlipped[index] = !newFlipped[index];
    setFlippedCards(newFlipped);
  };

  const resetAllCards = () => {
    setFlippedCards([false, false, false]);
    setCurrentMessages(["", "", ""]);
  };

  const changeDeck = (deckType) => {
    setActiveDeck(deckType);
    resetAllCards();
  };

  useEffect(() => {
    feather.replace();
  }, [flippedCards, activeDeck, isModalOpen]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 font-playfair text-indigo-900">
        Lời Khuyên{" "}
        {activeDeck === "business"
          ? "Kinh Doanh"
          : activeDeck === "finance"
            ? "Tài Chính"
            : activeDeck === "social" ?
              "Mối Quan Hệ"
              : "Nội Tâm"}{" "}
        Hôm Nay
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => changeDeck("business")}
          className={`px-4 py-2 rounded-lg ${activeDeck === "business"
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
        >
          Tài Chính
        </button>
        {/* <button
          onClick={() => changeDeck("finance")}
          className={`px-4 py-2 rounded-lg ${activeDeck === "finance"
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
        >
          Sức khoẻ

        </button> */}
        {/* <button
          onClick={() => changeDeck("social")}
          className={`px-4 py-2 rounded-lg ${activeDeck === "social"
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
        >
          Mối quan hệ

        </button> */}
        <button
          onClick={() => changeDeck("motivation")}
          className={`px-4 py-2 rounded-lg ${activeDeck === "motivation"
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
        >
          Nội tâm
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`card ${flippedCards[index] ? "flipped" : ""} cursor-pointer`}
            onClick={() => flipCard(index)}
          >
            <div className="card-inner">
              <div className="card-front bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
                <i
                  data-feather={index === 0 ? "zap" : index === 1 ? "trending-up" : "star"}
                  className="w-16 h-16 mb-6 text-yellow-300"
                />
                <h2 className="text-2xl font-bold mb-2 text-center font-playfair">Thẻ {index + 1}</h2>
                <p className="text-center opacity-90">Nhận lời khuyên hữu ích</p>
              </div>

              {/* CARD BACK: click để mở modal */}
              <div
                className="card-back bg-gradient-to-br from-amber-50 to-yellow-100 truncate-back"
                onClick={(e) => {
                  e.stopPropagation(); // không lật ngược thêm
                  openModal(currentMessages[index]);
                }}
                role="button"
                title="Nhấn để xem chi tiết"
              >
                <i data-feather="award" className="w-16 h-16 mb-4 text-amber-500" />
                <p className="text-lg md:text-xl text-center font-medium text-gray-800 font-poppins back-content">
                  {parse(currentMessages[index] || "")}
                </p>

                {/* nhãn gợi ý */}

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Nội dung chi tiết</h3>
              <button className="modal-close" onClick={closeModal} aria-label="Đóng">
                <i data-feather="x" />
              </button>
            </div>
            <div className="modal-body font-poppins prose max-w-none">
              {parse(modalContent || "")}
            </div>
            <div className="modal-footer">
              <button className="modal-btn" onClick={closeModal}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={resetAllCards}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-300 flex items-center"
      >
        <i data-feather="refresh-cw" className="mr-2"></i>
        Lật Lại Tất Cả
      </button>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
