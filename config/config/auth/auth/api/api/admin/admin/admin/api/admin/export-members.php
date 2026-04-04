<?php
require_once '../config/config.php';
require_once '../config/database.php';

if (!isAdmin()) exit('Unauthorized');

$database = new Database();
$db = $database->getConnection();

$stmt = $db->query("
    SELECT 
        u.full_name,
        u.email,
        u.phone,
        p.name as plan,
        m.start_date,
        m.end_date,
        u.created_at
    FROM users u
    LEFT JOIN memberships m ON u.id = m.user_id AND m.status = 'active'
    LEFT JOIN plans p ON m.plan_id = p.id
    WHERE u.role = 'member'
    ORDER BY u.created_at DESC
");

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="members_' . date('Y-m-d') . '.csv"');

$output = fopen('php://output', 'w');
fputcsv($output, ['Name', 'Email', 'Phone', 'Plan', 'Start Date', 'End Date', 'Joined']);

while ($row = $stmt->fetch()) {
    fputcsv($output, $row);
}

fclose($output);
?>