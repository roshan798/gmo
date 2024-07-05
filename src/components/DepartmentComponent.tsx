import React, { useState } from 'react';
import { Box, Typography, Checkbox, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { departmentsData } from '../data/departmentsData';

const DepartmentComponent: React.FC = () => {
    const [expandedDepartments, setExpandedDepartments] = useState<number[]>([]);
    const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
    const [selectedSubDepartments, setSelectedSubDepartments] = useState<{ [key: number]: number[] }>({});

    // console.log(expandedDepartments, "expandedDepartments ");
    // console.log(selectedDepartments, "selectedDepartments ");
    // console.log(selectedSubDepartments, "selectedSub");

    const handleExpandCollapse = (index: number) => {
        setExpandedDepartments((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const handleSelectDepartment = (index: number) => { // get the index of the department got selected
        const isDepartmentSelected = selectedDepartments.includes(index);

        setSelectedDepartments((prev) =>
            isDepartmentSelected ? prev.filter((i) => i !== index) : [...prev, index]
        );

        const subDepartments = departmentsData[index].sub_departments;
        // set select all subDepartments
        setSelectedSubDepartments((prev) => ({
            ...prev,
            [index]: isDepartmentSelected ? [] : subDepartments.map((_, i) => i),
        }));
    };

    const handleSelectSubDepartment = (subIndex: number, departmentIndex: number) => {
        const selectedSubs = selectedSubDepartments[departmentIndex] || [];
        const isSubDepartmentSelected = selectedSubs.includes(subIndex);

        const newSelectedSubs = isSubDepartmentSelected
            ? selectedSubs.filter((i) => i !== subIndex)
            : [...selectedSubs, subIndex];

        setSelectedSubDepartments((prev) => ({
            ...prev,
            [departmentIndex]: newSelectedSubs,
        }));

        if (newSelectedSubs.length === departmentsData[departmentIndex].sub_departments.length) {
            // if all subDepartment got selected then select the department
            setSelectedDepartments((prev) => (prev.includes(departmentIndex) ? prev : [...prev, departmentIndex]));
        } else {
            setSelectedDepartments((prev) => prev.filter((i) => i !== departmentIndex));
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Departments
            </Typography>
            {departmentsData.map((department, departmentIndex) => (
                <Box key={department.department} sx={{ marginBottom: 2 }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{ cursor: 'pointer', padding: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}
                        onClick={() => handleExpandCollapse(departmentIndex)}
                    >
                        <IconButton size="small">
                            {expandedDepartments.includes(departmentIndex) ? (
                                <ExpandLessIcon />
                            ) : (
                                <ExpandMoreIcon />
                            )}
                        </IconButton>
                        <Checkbox
                            checked={
                                selectedDepartments.includes(departmentIndex) ||
                                department.sub_departments.every((_, index) => (selectedSubDepartments[departmentIndex] || []).includes(index))
                            }
                            onChange={() => handleSelectDepartment(departmentIndex)}
                            indeterminate={
                                department.sub_departments.some((_, index) => (selectedSubDepartments[departmentIndex] || []).includes(index)) &&
                                !department.sub_departments.every((_, ind) => (selectedSubDepartments[departmentIndex] || []).includes(ind))
                            }
                        />
                        <Typography variant="body1" sx={{ flexGrow: 1 }}>
                            {department.department}
                        </Typography>
                    </Box>
                    {expandedDepartments.includes(departmentIndex) && (
                        <Box sx={{ paddingLeft: 4 }}>
                            {department.sub_departments.map((sub, subIndex) => (
                                <Box key={sub} display="flex" alignItems="center" sx={{ padding: 1, backgroundColor: '#e3f2fd', marginBottom: "1px" }}>
                                    <Checkbox
                                        checked={(selectedSubDepartments[departmentIndex] || []).includes(subIndex)}
                                        onChange={() => handleSelectSubDepartment(subIndex, departmentIndex)}
                                    />
                                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                        {sub}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default DepartmentComponent;
