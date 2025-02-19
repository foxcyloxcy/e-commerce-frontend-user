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
    subCategoryFromParent,
    onApplyPropertiesFilter
}) => {
    const [priceRange, setPriceRange] = useState({ minPrice: '', maxPrice: '' });
    const [propCategories, setPropCategories] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [errors, setErrors] = useState({});

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceRange((prev) => ({ ...prev, [name]: value }));
    };

    const validatePriceRange = () => {
        const { minPrice, maxPrice } = priceRange;
        const validationErrors = {};

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

    const handleCheckboxChange = (valueId) => {
        // Get existing values from localStorage or initialize as an empty string
        let storedValues = localStorage.getItem('selectedValues') || '';
    
        // Split the stored values into an array for validation
        let valuesArray = storedValues ? storedValues.split(',') : [];
    
        // Check if the valueId already exists in the array
        if (!valuesArray.includes(valueId)) {
            // Add the new valueId to the array
            valuesArray.push(valueId);
    
            // Update localStorage with the updated array as a comma-delimited string
            localStorage.setItem('selectedValues', valuesArray.join(','));
        }
    
        // Apply the properties filter
        // onApplyPropertiesFilter();
    };

    const handleSubCategorySelect = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setSelectedFilters({});
        handleSubCategoryClick(subCategory);
    };

    const handleSubCategorySelectFromParent = (subCategory) => {
        setSelectedSubCategory(subCategory);
    };

    useEffect(() => {

        if (subCategoryFromParent) {
            handleSubCategorySelectFromParent(subCategoryFromParent);
        }
    }, [subCategoryFromParent]);

    useEffect(() => {

        if(categories !== propCategories){
            setPropCategories(categories)
        }
    }, []);

    return (
        <Container sx={{ width: 300 }}>
            <Typography variant="h6" sx={{ paddingBottom: 2 }}>Filters</Typography>
            <Divider />

            <Typography variant="h6" gutterBottom>Price range</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="AED 50"
                        placeholder="AED 50"
                        name="minPrice"
                        type="number"
                        size="small"
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
                        size="small"
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

            <Typography variant="h6" gutterBottom sx={{ padding: 2 }}>Categories</Typography>
            <List>
                {propCategories.map((category) => (
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

            {selectedSubCategory &&
                selectedSubCategory.sub_category_property.map((property) => (
                    <React.Fragment key={property.id}>
                        <Typography variant="h6" gutterBottom>{property.name}</Typography>
                        <FormGroup row>
                            {property.sub_category_property_value.map((value) => (
                                <FormControlLabel
                                    key={value.id}
                                    control={
                                        <Checkbox
                                            onChange={() => handleCheckboxChange(value.id)}
                                        />
                                    }
                                    label={value.name}
                                />
                            ))}
                        </FormGroup>
                        <Divider sx={{ marginY: '20px' }} />
                    </React.Fragment>
                ))}
        </Container>
    );
};

export default DrawerContent;
