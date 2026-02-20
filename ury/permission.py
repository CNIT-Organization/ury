import frappe

URY_ROLE_NAMES = {
	"URY Cashier Enabled",
	"URY Captain Enabled",
	"URY Manager",
}


def check_app_permission():
	if frappe.session.user in {"Administrator", "System Manager"}:
		return True

	roles = set(frappe.get_roles(frappe.session.user) or [])
	return bool(roles.intersection(URY_ROLE_NAMES))