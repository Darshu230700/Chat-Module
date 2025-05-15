import { useState, useEffect, useCallback, useContext } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {
    DataGrid,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import {
    RenderCellStatus,
    RenderCellPhone,
    RenderCellEmail,
    RenderCellName,
    RenderCellNames,
} from '../admin-table-row';
import { AuthContext } from 'src/auth/context/jwt';
import { HIDE_COLUMNS_TOGGLABLE, handlePermission } from 'src/common/Common';
import { DeleteAdmin, GetAllAdmin } from 'src/api/admin';
import AdminTableToolbar from '../admin-table-toolbar';


// ----------------------------------------------------------------------

export default function AdminListView() {

    const { enqueueSnackbar } = useSnackbar();

    const confirmRows = useBoolean();

    const router = useRouter();

    const [tableData, setTableData] = useState([]);

    const [search, setSearch] = useState("");

    const [selectedAdmin, setSelectedAdmin] = useState("");

    const [loading, setLoading] = useState(true)

    const [totalCount, setTotalCount] = useState(0);

    const [page, setPage] = useState(0);

    const [pageSize, setPageSize] = useState(10);

    const [sorting, setSorting] = useState([]);

    const [filter, setFilter] = useState({});

    const [permission, setPermission] = useState({
        IsAudit: true,
        IsCreate: true,
        IsDelete: true,
        IsExport: true,
        IsPrint: true,
        IsEdit: true
    });

    // useEffect(() => {
    //     if (user) {
    //         let data = handlePermission(user?.UserPages, "Vendor List")
    //         setPermission(data)
    //     }
    // }, [])

    const fetchdata = async () => {
        const parameter = {
            Search: search,
            ObjSearch: null,
            Limit: pageSize,
            PageNumber: page,
            Field: sorting?.length > 0 ? sorting?.[0]?.field : "UserMasterID",
            Sort: sorting?.length > 0 ? sorting?.[0]?.sort : "Desc",
        };

        const { result, isLoading } = await GetAllAdmin(parameter);
        setTotalCount(result?.TotalRows)
        const newTableData = result?.data?.map((item) => ({
            ...item,
            id: item?.UserMasterID
        })) || [];
        setTableData(newTableData);
        setLoading(isLoading)
    }

    useEffect(() => {
        if (loading) {
            fetchdata()
        }
    }, [loading]);

    const handleDeleteRow = useCallback(
        async (id) => {
            let Params = {
                UserMasterID: selectedAdmin
            }

            const { status, message } = await DeleteAdmin(Params);
            if (status) {
                enqueueSnackbar('Delete success!');
                setLoading(true)
            } else {
                enqueueSnackbar(message, { variant: "error" });
            }
        },
        [enqueueSnackbar, tableData, selectedAdmin]
    );

    const handleEditRow = useCallback(
        (id) => {
            router.push(paths.admin.edit(id));
        },
        [router]
    );

    const handlePaginationChange = (paginationModel) => {
        setPage(paginationModel.page);
        setPageSize(paginationModel.pageSize);
        setLoading(true)
    };

    const columns = [
        {
            field: 'FirstName',
            headerName: 'Name',
            flex: 1,
            minWidth: 300,
            hideable: false,
            renderCell: (params) => {
                if (permission?.IsEdit) {
                    return <RenderCellName params={params} handleEditRow={handleEditRow} />;
                } else {
                    return <RenderCellNames params={params} />
                }
            },
        },
        {
            field: 'EmailID',
            headerName: 'Email',
            width: 360,
            flex: 1,
            editable: false,
            hideable: false,
            renderCell: (params) => <RenderCellEmail params={params} />,
        },
        {
            field: 'Phone',
            headerName: 'Phone',
            width: 160,
            flex: 1,
            editable: false,
            renderCell: (params) => <RenderCellPhone params={params} />,
        },
        {
            field: 'IsActive',
            headerName: 'Status',
            width: 180,
            editable: false,
            filterable: false,
            renderCell: (params) => <RenderCellStatus params={params} />,
        },
        {
            type: 'actions',
            field: 'actions',
            headerName: ' ',
            align: 'right',
            headerAlign: 'right',
            width: 80,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            getActions: (params) => {
                if (!permission?.IsEdit && !permission?.IsDelete) {
                    return []; // Return an empty array if neither permission is granted
                }
                const actions = [
                    permission?.IsEdit && (
                        <GridActionsCellItem
                            showInMenu
                            icon={<Iconify icon="solar:pen-bold" />}
                            label="Edit"
                            onClick={() => handleEditRow(params.row.UserMasterID)}
                        />
                    ),
                    permission?.IsDelete && (
                        <GridActionsCellItem
                            showInMenu
                            icon={<Iconify icon="solar:trash-bin-trash-bold" />}
                            label="Delete"
                            onClick={() => {
                                setSelectedAdmin(params.row.UserMasterID);
                                confirmRows.onTrue();
                            }}
                            sx={{ color: 'error.main' }}
                        />
                    ),
                ];

                // Filter out any false values
                return actions.filter(Boolean);
            },
        }
    ];
    const getTogglableColumns = () =>
        columns
            .filter((column) => !HIDE_COLUMNS_TOGGLABLE?.includes(column.field))
            .map((column) => column.field);

    return (
        <>
            <Container
                maxWidth={false}
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CustomBreadcrumbs
                    heading="Admin List"
                    links={[
                        {
                            name: '',
                        },
                    ]}
                    action={
                        <>
                            {permission?.IsCreate && (
                                <Button
                                    component={RouterLink}
                                    href={paths.admin.new}
                                    variant="contained"
                                    startIcon={<Iconify icon="mingcute:add-line" />}
                                >
                                    New Admin
                                </Button>
                            )}
                        </>
                    }
                    sx={{
                        mb: {
                            xs: 3,
                            md: 3,
                        },
                    }}
                />

                <Card
                    sx={{
                        height: 600,
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <AdminTableToolbar
                        setSearch={setSearch}
                        search={search}
                        setLoading={setLoading}
                        setPage={setPage}
                    />
                    <DataGrid
                        rowCount={totalCount}
                        rows={tableData}
                        columns={columns}
                        loading={loading}
                        paginationMode="server"
                        // filterMode='server'
                        sortingMode='server'
                        getRowHeight={() => 'auto'}
                        pageSizeOptions={[5, 10, 25]}
                        initialState={{
                            pagination: {
                                paginationModel: { page, pageSize },
                            },
                        }}
                        paginationModel={{ page, pageSize }}
                        onPaginationModelChange={handlePaginationChange}
                        onFilterModelChange={(newFilter) => {
                            setFilter(newFilter)
                        }}
                        onSortModelChange={(sort) => {
                            setSorting(sort)
                            setLoading(true)
                        }}
                        slots={{
                            noRowsOverlay: () => <EmptyContent title="No Record" />,
                            noResultsOverlay: () => <EmptyContent title="No results found" />,
                        }}
                        slotProps={{
                            columnsPanel: {
                                getTogglableColumns,
                            },
                        }}
                    />
                </Card>
            </Container >

            <ConfirmDialog
                open={confirmRows.value}
                onClose={confirmRows.onFalse}
                title="Delete"
                content={
                    <>
                        Are you sure you want to delete this admin?
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDeleteRow();
                            confirmRows.onFalse();
                        }}
                    >
                        Delete
                    </Button>
                }
            />
        </>
    );
}
