package com.krushiseva.config;

import com.krushiseva.entity.Category;
import com.krushiseva.entity.Product;
import com.krushiseva.repository.CategoryRepository;
import com.krushiseva.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class DataInitializer implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public DataInitializer(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            seedCategoriesAndProducts();
        }
        logger.info("Seed complete: categories={}, products={}",
            categoryRepository.count(), productRepository.count());
    }

    private void seedCategoriesAndProducts() {
        Map<String, Category> categories = new LinkedHashMap<>();
        categories.put("Seeds", category("Seeds", "बियाणे", "bi bi-flower1", "Certified seeds for a strong crop start."));
        categories.put("Fertilizers", category("Fertilizers", "खते", "bi bi-moisture", "Crop nutrition from trusted brands."));
        categories.put("Pesticides", category("Pesticides", "कीटकनाशके", "bi bi-shield-check", "Crop protection products; always follow the label."));
        categories.put("Equipment", category("Equipment", "अवजारे", "bi bi-tools", "Practical equipment for farm work."));
        categories.put("Irrigation", category("Irrigation", "सिंचन", "bi bi-droplet-half", "Water management and irrigation supplies."));
        categories.put("Animal Feed", category("Animal Feed", "पशुखाद्य", "bi bi-basket2", "Feed and nutrition for healthy livestock."));
        categories.put("Organic", category("Organic", "सेंद्रिय", "bi bi-leaf", "Organic inputs for soil and crop care."));
        categories.put("Horticulture", category("Horticulture", "फलोत्पादन", "bi bi-tree", "Specialty supplies for orchards and horticulture."));
        categoryRepository.saveAll(categories.values());

        seedProduct("Mahyco BT Cotton Seeds", "महायको बीटी कापूस बियाणे", "Mahyco",
            categories.get("Seeds"), "850.00", "900.00", "0", 4.6,
            "Cotton seed. Confirm variety, current batch and suitability for your area with the shop.",
            "/images/product_placeholder.svg");
        seedProduct("Syngenta Maize", "सिंजेंटा मका", "Syngenta",
            categories.get("Seeds"), "1,250.00", "1,350.00", "0", 4.5,
            "Maize seed. Ask the shop about the available hybrid and recommended growing conditions.",
            "/images/product_placeholder.svg");
        seedProduct("Bayer Soybean", "बायर सोयाबीन", "Bayer",
            categories.get("Seeds"), "950.00", "1,000.00", "0", 4.4,
            "Soybean seed. Check the product label and local agricultural guidance before selection.",
            "/images/product_placeholder.svg");
        seedProduct("IFFCO NPK Fertilizer", "इफको एनपीके खत", "IFFCO",
            categories.get("Fertilizers"), "1,470.00", "1,550.00", "5", 4.7,
            "NPK fertilizer for crop nutrition. Apply only at label and soil-test recommended rates.",
            "/images/product_placeholder.svg");
        seedProduct("Mahadhan 10:26:26", "महाधन १०:२६:२६", "Mahadhan",
            categories.get("Fertilizers"), "1,520.00", "1,600.00", "5", 4.6,
            "10:26:26 complex fertilizer. Confirm application timing and quantity with an agronomist.",
            "/images/product_placeholder.svg");
        seedProduct("Syngenta Pesticide", "सिंजेंटा पीक संरक्षण", "Syngenta",
            categories.get("Pesticides"), "680.00", "720.00", "18", 4.3,
            "Crop-protection product. Identify the pest first and follow all label directions and precautions.",
            "/images/product_placeholder.svg");
        seedProduct("Bayer CropScience Fungicide", "बायर बुरशीनाशक", "Bayer CropScience",
            categories.get("Pesticides"), "790.00", "840.00", "18", 4.5,
            "Fungicide product. Read the label for crop, disease, rate, protective equipment and harvest interval.",
            "/images/product_placeholder.svg");
        seedProduct("Jain Drip Irrigation Kit", "जैन ठिबक सिंचन संच", "Jain Irrigation",
            categories.get("Irrigation"), "5,500.00", "5,900.00", "12", 4.8,
            "Drip irrigation kit. Confirm layout, included components and field suitability with the shop.",
            "/images/product_placeholder.svg");
        seedProduct("Battery Sprayer", "बॅटरी फवारणी यंत्र", "Kisan",
            categories.get("Equipment"), "4,200.00", "4,500.00", "18", 4.4,
            "Battery sprayer for farm use. Check the included battery, charger, capacity and warranty in store.",
            "/images/product_placeholder.svg");
        seedProduct("Organic Vermicompost", "सेंद्रिय गांडूळखत", "Organic Life",
            categories.get("Organic"), "450.00", "500.00", "5", 4.7,
            "Vermicompost for soil improvement. Application rates should be based on crop and soil needs.",
            "/images/product_placeholder.svg");
        seedProduct("Neem Cake Fertilizer", "कडुनिंब पेंड खत", "Organic Life",
            categories.get("Organic"), "650.00", "700.00", "5", 4.5,
            "Neem cake soil input. Consult local guidance for crop-specific use and quantities.",
            "/images/product_placeholder.svg");
        seedProduct("Grape Boron Supplement", "द्राक्ष बोरॉन पूरक", "Mahadhan",
            categories.get("Horticulture"), "350.00", "380.00", "5", 4.4,
            "Boron micronutrient supplement for horticulture. Use only as directed by the product label or an agronomist.",
            "/images/product_placeholder.svg");
    }

    private Category category(String name, String nameMr, String iconClass, String shortDescription) {
        Category category = new Category();
        category.setName(name);
        category.setNameMr(nameMr);
        category.setIconClass(iconClass);
        category.setShortDescription(shortDescription);
        category.setDescription(shortDescription);
        return category;
    }

    private void seedProduct(String name, String nameMr, String company, Category category,
                             String price, String mrp, String gstRate, double rating,
                             String description, String imageUrl) {
        Product product = new Product();
        product.setName(name);
        product.setNameMr(nameMr);
        product.setCompany(company);
        product.setCategory(category);
        product.setPrice(amount(price));
        product.setMrp(amount(mrp));
        product.setDiscountPrice(null);
        product.setGstRate(amount(gstRate));
        product.setStockQuantity(100);
        product.setMinimumStock(10);
        product.setRating(rating);
        product.setDescription(description);
        product.setImageUrl(imageUrl);
        product.setImage(imageUrl);
        product.setStatus(Product.ProductStatus.ACTIVE);
        productRepository.save(product);
    }

    private BigDecimal amount(String value) {
        return new BigDecimal(value.replace(",", ""));
    }
}
