package com.krushiseva.service;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;

@Component
public class ProductImageStorage {
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of("image/jpeg", "image/png", "image/webp", "image/gif");
    private final Path uploadDirectory = Path.of(System.getProperty("user.home"), ".krushi-seva", "uploads", "products");

    public String store(MultipartFile image) throws IOException {
        if (image == null || image.isEmpty()) {
            return null;
        }
        if (image.getContentType() == null || !ALLOWED_CONTENT_TYPES.contains(image.getContentType())) {
            throw new IllegalArgumentException("Upload a JPG, PNG, WebP, or GIF product image.");
        }

        String originalName = StringUtils.cleanPath(image.getOriginalFilename() == null ? "" : image.getOriginalFilename());
        String extension = StringUtils.getFilenameExtension(originalName);
        if (extension == null || !Set.of("jpg", "jpeg", "png", "webp", "gif").contains(extension.toLowerCase(Locale.ROOT))) {
            throw new IllegalArgumentException("The product image must use a JPG, PNG, WebP, or GIF file extension.");
        }

        Files.createDirectories(uploadDirectory);
        String filename = UUID.randomUUID() + "." + extension.toLowerCase(Locale.ROOT);
        image.transferTo(uploadDirectory.resolve(filename));
        return "/uploads/products/" + filename;
    }
}
