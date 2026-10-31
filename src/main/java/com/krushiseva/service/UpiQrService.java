package com.krushiseva.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.stereotype.Service;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class UpiQrService {
    private static final String UPI_ID = "8600813827@upi";

    public byte[] createPng(BigDecimal amount, String note) throws WriterException, IOException {
        StringBuilder payload = new StringBuilder("upi://pay?pa=")
            .append(UPI_ID)
            .append("&pn=")
            .append(URLEncoder.encode("Saptashrungi Agro Services", StandardCharsets.UTF_8))
            .append("&cu=INR");
        if (amount != null && amount.signum() > 0) {
            payload.append("&am=").append(amount.stripTrailingZeros().toPlainString());
        }
        if (note != null && !note.isBlank()) {
            payload.append("&tn=").append(URLEncoder.encode(note.trim(), StandardCharsets.UTF_8));
        }
        Map<EncodeHintType, Object> hints = new HashMap<>();
        hints.put(EncodeHintType.MARGIN, 2);
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        BitMatrix matrix = new MultiFormatWriter()
            .encode(payload.toString(), BarcodeFormat.QR_CODE, 720, 720, hints);
        ByteArrayOutputStream png = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(matrix, "PNG", png);
        return png.toByteArray();
    }

    public byte[] createJpeg(BigDecimal amount) throws WriterException, IOException {
        StringBuilder payload = new StringBuilder("upi://pay?pa=")
            .append(UPI_ID)
            .append("&pn=Saptashrungi%20Agro%20Services&cu=INR");
        if (amount != null && amount.signum() > 0) {
            payload.append("&am=").append(amount.stripTrailingZeros().toPlainString());
        }

        Map<EncodeHintType, Object> hints = new HashMap<>();
        hints.put(EncodeHintType.MARGIN, 2);
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        BitMatrix matrix = new MultiFormatWriter()
            .encode(payload.toString(), BarcodeFormat.QR_CODE, 720, 720, hints);

        ByteArrayOutputStream png = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(matrix, "PNG", png);
        var image = ImageIO.read(new java.io.ByteArrayInputStream(png.toByteArray()));
        Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("jpeg");
        if (!writers.hasNext()) {
            throw new IOException("No JPEG image writer is available.");
        }

        ImageWriter writer = writers.next();
        try (ByteArrayOutputStream jpeg = new ByteArrayOutputStream();
             var output = ImageIO.createImageOutputStream(jpeg)) {
            writer.setOutput(output);
            ImageWriteParam parameters = writer.getDefaultWriteParam();
            if (parameters.canWriteCompressed()) {
                parameters.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
                parameters.setCompressionQuality(1.0f);
            }
            writer.write(null, new IIOImage(image, null, null), parameters);
            output.flush();
            return jpeg.toByteArray();
        } finally {
            writer.dispose();
        }
    }
}
