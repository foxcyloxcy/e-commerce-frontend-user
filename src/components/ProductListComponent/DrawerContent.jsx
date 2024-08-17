import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    Collapse,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    Button,
    Grid
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const DrawerContent = ({
    categories,
    openCategory,
    handleToggleCategory,
    isSmallScreen,
    handleSubCategoryClick,
    onApplyPriceRange,
    subCategoryFromParent
}) => {
    const [priceRange, setPriceRange] = useState({ minPrice: '', maxPrice: '' });
    const [selectedFilters, setSelectedFilters] = useState({});
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [errors, setErrors] = useState({});

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceRange((prev) => ({ ...prev, [name]: value }));
    };

    const validatePriceRange = () => {
        const { minPrice, maxPrice } = priceRange;
        let validationErrors = {};

        if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
            validationErrors.minPrice = 'Minimum price cannot exceed maximum price';
        }
        if (minPrice && minPrice < 50) {
            validationErrors.minPrice = 'Minimum price must be at least AED 50';
        }
        if (maxPrice && maxPrice > 50000) {
            validationErrors.maxPrice = 'Maximum price cannot exceed AED 50,000';
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleApplyPriceRange = () => {
        if (validatePriceRange()) {
            onApplyPriceRange(priceRange.minPrice, priceRange.maxPrice);
        }
    };

    const handleFilterChange = (propertyId, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [propertyId]: prevFilters[propertyId]?.includes(value)
                ? prevFilters[propertyId].filter((item) => item !== value)
                : [...(prevFilters[propertyId] || []), value],
        }));
    };

    const handleSubCategorySelect = (subCategory) => {
        setSelectedSubCategory(subCategory);
        handleSubCategoryClick(subCategory)
    };

    const handleSubCategorySelectFromParent = (subCategory) => {
        setSelectedSubCategory(subCategory);
    };

    useEffect(() => {
        if (subCategoryFromParent) {
            handleSubCategorySelectFromParent(subCategoryFromParent);
        }
    }, [subCategoryFromParent]);

    return (
        <Container sx={{ width: 300, padding: 2 }}>
            <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 2 }}>Filters</Typography>
            <Divider />

            <Typography variant="h6" gutterBottom>Price range</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="AED 50"
                        placeholder="AED 50"
                        name="minPrice"
                        type="number"
                        value={priceRange.minPrice}
                        onChange={handlePriceChange}
                        error={!!errors.minPrice}
                        helperText={errors.minPrice || ''}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="AED 50,000"
                        placeholder="AED 50,000"
                        name="maxPrice"
                        type="number"
                        value={priceRange.maxPrice}
                        onChange={handlePriceChange}
                        error={!!errors.maxPrice}
                        helperText={errors.maxPrice || ''}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: '10px' }}
                onClick={handleApplyPriceRange}
            >
                Apply
            </Button>
            <Divider sx={{ marginTop: '10px' }} />
            {isSmallScreen && (
                <>
                    <Typography variant="h6" gutterBottom sx={{ padding: 2 }}>Categories</Typography>
                    <List>
                        {categories.map((category) => (
                            <React.Fragment key={category.id}>
                                <ListItem button onClick={() => handleToggleCategory(category.id)}>
                                    <ListItemText primary={category.name} />
                                    {openCategory[category.id] ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={openCategory[category.id]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {category.sub_category.map((subCategory) => (
                                            <ListItem
                                                button
                                                key={subCategory.id}
                                                sx={{ pl: 4 }}
                                                onClick={() => handleSubCategorySelect(subCategory)}
                                            >
                                                <ListItemText primary={subCategory.name} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        ))}
                    </List>
                    <Divider sx={{ marginY: '20px' }} />
                </>
            )}

            {selectedSubCategory && (
                <div>
                    {selectedSubCategory.sub_category_property.map((property) => (
                        <React.Fragment key={property.id}>
                            <Typography variant="h6" gutterBottom>{property.name}</Typography>
                            <FormGroup>
                                {property.sub_category_property_value.map((value) => (
                                    <FormControlLabel
                                        key={value.id}
                                        control={
                                            <Checkbox
                                                onChange={() => handleFilterChange(property.id, value.id)}
                                                checked={selectedFilters[property.id]?.includes(value.id) || false}
                                            />
                                        }
                                        label={value.name}
                                    />
                                ))}
                            </FormGroup>
                            <Divider sx={{ marginY: '20px' }} />
                        </React.Fragment>
                    ))}
                </div>
            )}
        </Container>
    );
};

export default DrawerContent;
