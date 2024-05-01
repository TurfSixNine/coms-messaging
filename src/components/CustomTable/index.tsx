import * as React from 'react';
import { DataGrid, GridColDef,  } from '@mui/x-data-grid';
import { CurrentUser, GroupGridRow, MessageGridRow} from '../../interfaces'

interface IData {
    columns: GridColDef[];
    rows: GroupGridRow[] | MessageGridRow[] | CurrentUser[]; 

}

export const CustomTable = (props: IData) => {
    return (
        <div style={{ height: 400, minWidth: "60%", maxWidth: '100%' }}>
            <DataGrid
                rows={props.rows}
                columns={props.columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
