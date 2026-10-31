package com.krushiseva.service;

import com.google.zxing.BinaryBitmap;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import org.junit.jupiter.api.Test;

import javax.imageio.ImageIO;
import java.io.ByteArrayInputStream;
import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

class UpiQrServiceTest {
    private final UpiQrService upiQrService = new UpiQrService();

    @Test
    void createsScannableMerchantQrWithDynamicAmount() throws Exception {
        byte[] jpeg = upiQrService.createJpeg(new BigDecimal("1250.50"));
        var image = ImageIO.read(new ByteArrayInputStream(jpeg));
        var bitmap = new BinaryBitmap(new HybridBinarizer(new BufferedImageLuminanceSource(image)));

        assertThat(image.getWidth()).isEqualTo(720);
        assertThat(new MultiFormatReader().decode(bitmap).getText())
            .isEqualTo("upi://pay?pa=8600813827@upi&pn=Saptashrungi%20Agro%20Services&cu=INR&am=1250.5");
    }
}
