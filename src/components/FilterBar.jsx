import { FormControl, InputLabel, Stack, MenuItem, Select, TextField, Grid } from "@mui/material"
import useTaskStore from "../store/store"

const FilterBar = () => {
  const { filters, setFilters } = useTaskStore();

  return (
    <Grid container mb={2} spacing={2} >
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Priority</InputLabel>
            <Select
              value={filters.priority}
              label="Priority"
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value })
              }
            >
              <MenuItem value="">
                <em>All Priority</em>
              </MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Assignee" id="Assignee"
            size="small"
            placeholder="Search by assignee..."
            value={filters.assignee}
            onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
          />
        </Grid>
    </Grid>
  );
};

export default FilterBar
