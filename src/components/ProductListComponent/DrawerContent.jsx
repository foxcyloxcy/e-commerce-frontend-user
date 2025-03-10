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
    Grid,
    Box
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const DrawerContent = ({
    categories,
    openCategory,
    handleToggleCategory,
    handleSubCategoryClick,
    subCategoryFromParent,
    searchParams,
    setSearchParams,
    resetCategory
}) => {
    const [priceRange, setPriceRange] = useState({ minPrice: '', maxPrice: '' });
    const [propCategories, setPropCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [errors, setErrors] = useState({});
    const urlCategoryId = searchParams.get("category_id");
    const urlCategoryName = searchParams.get("category_name");
    const subCategoryId = searchParams.get("sub_category_id");
    const subCategoryName = searchParams.get("sub_category_name");

    const handlePriceChange = (event) => {
        const { name, value } = event.target;
        setPriceRange((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validatePriceRange = () => {
        const { minPrice, maxPrice } = priceRange;
        const validationErrors = {};

        if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
            validationErrors.minPrice = "Minimum price cannot exceed maximum price";
        }
        if (minPrice && Number(minPrice) < 50) {
            validationErrors.minPrice = "Minimum price must be at least AED 50";
        }
        if (maxPrice && Number(maxPrice) > 50000) {
            validationErrors.maxPrice = "Maximum price cannot exceed AED 50,000";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleApplyPriceRange = () => {
        if (!validatePriceRange()) return;
        const updatedParams = new URLSearchParams(searchParams);

        updatedParams.set("filter_min_price", priceRange.minPrice);
        updatedParams.set("filter_max_price", priceRange.maxPrice);
        updatedParams.set("page", 1);

        setSearchParams(updatedParams); // ✅ Correct way to update URL search params
    };

    const handleCheckboxChange = (valueId) => {
        const updatedParams = new URLSearchParams(searchParams);

        // Ensure `filter_properties` is always a valid string before splitting
        let valuesArray = updatedParams.get('filter_properties') ? updatedParams.get('filter_properties').split(',') : [];

        // Toggle the value: add if not present, remove if already exists
        if (valuesArray.includes(valueId.toString())) {
            valuesArray = valuesArray.filter(id => id !== valueId.toString());
        } else {
            valuesArray.push(valueId.toString());
        }

        // Update or remove `filter_properties`
        if (valuesArray.length === 0) {
            updatedParams.delete('filter_properties');
        } else {
            updatedParams.set('filter_properties', valuesArray.join(','));
            updatedParams.set('page', 1)
        }

        setSearchParams(updatedParams); // ✅ Correct way to update search params without removing other params
    };

    const isChecked = (valueId) => {
        let valuesArray = searchParams.get('filter_properties') ? searchParams.get('filter_properties').split(',') : [];
        return valuesArray.includes(valueId.toString());
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

        if (categories !== propCategories) {
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

            <Typography variant="h6" gutterBottom sx={{ pt: 2 }}>Categories</Typography>
            {subCategoryId ? (
                <Grid container display="flex" alignItems="center" justifyContent="space-between" p={2} bgcolor="grey.100">
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight="bold" sx={{
                            textAlign:"center"
                        }}>
                            {urlCategoryName} : {subCategoryName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="text" color="primary" fullWidth onClick={resetCategory}>
                            Reset Category
                        </Button>
                    </Grid>

                </Grid>
            ) : (
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
                                            onClick={() => handleSubCategoryClick(subCategory, category.id, category.name)}
                                        >
                                            <ListItemText primary={subCategory.name} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    ))}
                </List>
            )}
            <Divider sx={{ marginY: '20px' }} />

            {selectedSubCategory &&
                selectedSubCategory.sub_category_property.map((property) => (
                    <React.Fragment key={property.id}>
                        <Typography variant="h6" gutterBottom>{property.name}</Typography>
                        <FormGroup row>
                            {property.sub_category_property_value.map((value) => (
                                <FormControlLabel
                                    value={searchParams.get('filter_properties') ? searchParams.get('filter_properties').split(',') : []}
                                    key={value.id}
                                    control={
                                        <Checkbox
                                            onChange={() => handleCheckboxChange(value.id)}
                                            checked={isChecked(value.id)}
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
