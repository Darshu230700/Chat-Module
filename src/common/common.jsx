import { paths } from "src/routes/paths";
import { HOST_API } from "src/config-global";

// ------------------------------------------------------------------------------------------------------------

export const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ------------------------------------------------------------------------------------------------------------

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------

export function handlePermission(result, targetPageName, subPageName) {
    let obj = {};

    function checkAndAssignProperties(module) {
        if (module?.PageName === targetPageName) {
            obj = {
                IsAudit: module?.IsAudit,
                IsCreate: module?.IsCreate,
                IsDelete: module?.IsDelete,
                IsExport: module?.IsExport,
                IsPrint: module?.IsPrint,
                IsEdit: module?.IsEdit,
                IsView: module?.IsView,
                IsApprove: module?.IsApprove
            };
            return true; // Found the target page, no need to search further
        }
        return false;
    }

    function traverseModules(modules) {
        for (let module of modules) {
            if (module?.SubModule?.length > 0) {
                if (module?.PageName === subPageName) {
                    if (checkAndAssignProperties(module)) {
                        return true; // Found the target page, no need to search further
                    }
                    if (module.SubModule.some(subModule => checkAndAssignProperties(subModule))) {
                        return true; // Found in submodules, no need to search further
                    }
                } else {
                    if (traverseModules(module.SubModule)) {
                        return true; // Found in nested submodules, no need to search further
                    }
                }
            } else {
                if (checkAndAssignProperties(module)) {
                    return true; // Found the target page, no need to search further
                }
            }
        }
        return false;
    }

    traverseModules(result);

    return obj;
}

// ------------------------------------------------------------------------------------------------------------

export function findModuleByID(arr, id) {
    for (const module of arr) {
        if (module.ModuleID === id) {
            return module;
        }
        if (module.SubModule && module.SubModule.length > 0) {
            const found = findModuleByID(module.SubModule, id);
            if (found) {
                return found;
            }
        }
    }
    return null;
}

// ------------------------------------------------------------------------------------------------------------


export function findPath(module) {
    switch (module?.ModuleID) {
        case 1:
            return paths.dashboard.root
        case 2:
            return paths.vendor.root
        case 3:
            return paths.invoice.root
        case 4:
            return paths.Approval.root
        case 7:
            return paths.User.root
        case 8:
            return paths.UserAccess.root
        case 10:
            return paths.Receipts.root
        case 11:
            return paths.PurchaseOrder.root
        case 46:
            return paths.ServiceSchedule.root
        case 12:
            return paths.InvoiceApproval.root
        case 19:
            return paths.Report.Invoice
        case 20:
            return paths.Report.APAging
        case 21:
            return paths.Report.PaymentHistory
        case 22:
            return paths.Report.Summary
        case 24:
            return paths.Incident.root
        case 26:
            return paths.Illness.Student.root
        case 28:
            return paths.Food.Meal.root
        case 30:
            return paths.Pedagogy.Projection.root
        case 31:
            return paths.Admin.ManageStudents.root
        case 35:
            return paths.Admin.StaggingApprove.root
        case 36:
            return paths.OrgChart.root
        case 37:
            return paths.Admin.TimeOffRequest.root
        case 38:
            return paths.UploadInvoiceReceipt.root
        case 40:
            return paths.dashboard.compliance
        case 44:
            return paths.DailyReport.add
        case 45:
            return paths.DailyReport.manage
        case 48:
            return paths.Recruitment.root
        case 49:
            return paths.ManageCandidate.root
        case 50:
            return paths.ManageLovs.root
        case 56:
            return paths.Observation.ObservationMaster.root
        case 57:
            return paths.Observation.ViewLeadershipObservation.root
        case 58:
            return paths.ObservationDashboard.root
        case 59:
            return paths.EmailTemplate.root
        case 61:
            return paths.PerformanceEvaluation.Question.root
        case 62:
            return paths.PerformanceEvaluation.SubQuestion.root
        default:
            return paths.dashboard.root
    }
}

// ------------------------------------------------------------------------------------------------------------

export const phoneMask = [
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
];

// ------------------------------------------------------------------------------------------------------------

export const phoneRegExp = /^\(\d{3}\) \d{3}-\d{4}$/;

// ------------------------------------------------------------------------------------------------------------