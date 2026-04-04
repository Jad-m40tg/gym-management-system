<?php
require_once '../config/config.php';
require_once '../config/database.php';

if (!isAdmin()) {
    redirect('../login.html');
}

$database = new Database();
$db = $database->getConnection();

// Get stats
$stats = [];

// Total members
$stmt = $db->query("SELECT COUNT(*) as count FROM users WHERE role = 'member'");
$stats['total_members'] = $stmt->fetch()['count'];

// Active subscriptions
$stmt = $db->query("SELECT COUNT(*) as count FROM memberships WHERE status = 'active'");
$stats['active_subscriptions'] = $stmt->fetch()['count'];

// Classes today
$today = date('l');
$stmt = $db->prepare("SELECT COUNT(*) as count FROM classes WHERE day_of_week = ?");
$stmt->execute([$today]);
$stats['classes_today'] = $stmt->fetch()['count'];

// Revenue this month
$stmt = $db->query("
    SELECT SUM(p.price) as revenue
    FROM memberships m
    JOIN plans p ON m.plan_id = p.id
    WHERE MONTH(m.start_date) = MONTH(CURRENT_DATE())
    AND YEAR(m.start_date) = YEAR(CURRENT_DATE())
");
$stats['monthly_revenue'] = $stmt->fetch()['revenue'] ?? 0;

// Recent registrations
$stmt = $db->query("
    SELECT u.full_name, u.email, u.created_at, p.name as plan_name
    FROM users u
    JOIN memberships m ON u.id = m.user_id
    JOIN plans p ON m.plan_id = p.id
    WHERE u.role = 'member'
    ORDER BY u.created_at DESC
    LIMIT 5
");
$recent_members = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
    <div class="admin-container">
        <?php include 'includes/sidebar.php'; ?>
        
        <main class="main-content">
            <h1>Dashboard</h1>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Total Members</h3>
                    <p class="stat-number"><?= $stats['total_members'] ?></p>
                </div>
                <div class="stat-card">
                    <h3>Active Subscriptions</h3>
                    <p class="stat-number"><?= $stats['active_subscriptions'] ?></p>
                </div>
                <div class="stat-card">
                    <h3>Classes Today</h3>
                    <p class="stat-number"><?= $stats['classes_today'] ?></p>
                </div>
                <div class="stat-card">
                    <h3>Revenue This Month</h3>
                    <p class="stat-number"><?= number_format($stats['monthly_revenue'], 2) ?> DZD</p>
                </div>
            </div>
            
            <section class="recent-activity">
                <h2>Recent Registrations</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Plan</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($recent_members as $member): ?>
                        <tr>
                            <td><?= clean($member['full_name']) ?></td>
                            <td><?= clean($member['email']) ?></td>
                            <td><?= clean($member['plan_name']) ?></td>
                            <td><?= date('M d, Y', strtotime($member['created_at'])) ?></td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </section>
        </main>
    </div>
</body>
</html>
