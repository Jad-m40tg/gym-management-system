<?php
require_once '../config/config.php';
require_once '../config/database.php';

if (!isAdmin()) redirect('../login.html');

$database = new Database();
$db = $database->getConnection();

// Pagination
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$perPage = 10;
$offset = ($page - 1) * $perPage;

// Filters
$search = $_GET['search'] ?? '';
$planFilter = $_GET['plan'] ?? '';

// Build query
$where = ["u.role = 'member'"];
$params = [];

if ($search) {
    $where[] = "(u.full_name LIKE ? OR u.email LIKE ?)";
    $params[] = "%$search%";
    $params[] = "%$search%";
}

if ($planFilter) {
    $where[] = "p.id = ?";
    $params[] = $planFilter;
}

$whereSQL = implode(' AND ', $where);

// Get total count
$countSQL = "
    SELECT COUNT(DISTINCT u.id) as total
    FROM users u
    LEFT JOIN memberships m ON u.id = m.user_id AND m.status = 'active'
    LEFT JOIN plans p ON m.plan_id = p.id
    WHERE $whereSQL
";
$stmt = $db->prepare($countSQL);
$stmt->execute($params);
$totalMembers = $stmt->fetch()['total'];
$totalPages = ceil($totalMembers / $perPage);

// Get members
$sql = "
    SELECT 
        u.id,
        u.full_name,
        u.email,
        u.phone,
        u.created_at,
        p.name as plan_name,
        m.end_date,
        m.status as membership_status
    FROM users u
    LEFT JOIN memberships m ON u.id = m.user_id AND m.status = 'active'
    LEFT JOIN plans p ON m.plan_id = p.id
    WHERE $whereSQL
    ORDER BY u.created_at DESC
    LIMIT $perPage OFFSET $offset
";
$stmt = $db->prepare($sql);
$stmt->execute($params);
$members = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Manage Members</title>
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
    <div class="admin-container">
        <?php include 'includes/sidebar.php'; ?>
        
        <main class="main-content">
            <h1>Members Management</h1>
            
            <!-- Filters -->
            <form method="GET" class="filters">
                <input type="text" name="search" placeholder="Search by name or email" value="<?= clean($search) ?>">
                <select name="plan">
                    <option value="">All Plans</option>
                    <?php
                    $plans = $db->query("SELECT id, name FROM plans")->fetchAll();
                    foreach ($plans as $plan):
                    ?>
                    <option value="<?= $plan['id'] ?>" <?= $planFilter == $plan['id'] ? 'selected' : '' ?>>
                        <?= clean($plan['name']) ?>
                    </option>
                    <?php endforeach; ?>
                </select>
                <button type="submit">Filter</button>
                <a href="members.php" class="btn-secondary">Clear</a>
            </form>
            
            <!-- Members Table -->
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Plan</th>
                        <th>Expiry</th>
                        <th>Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($members as $member): ?>
                    <tr>
                        <td><?= clean($member['full_name']) ?></td>
                        <td><?= clean($member['email']) ?></td>
                        <td><?= clean($member['phone']) ?></td>
                        <td><?= clean($member['plan_name'] ?? 'No Plan') ?></td>
                        <td><?= $member['end_date'] ? date('M d, Y', strtotime($member['end_date'])) : '-' ?></td>
                        <td><?= date('M d, Y', strtotime($member['created_at'])) ?></td>
                        <td class="actions">
                            <a href="edit-member.php?id=<?= $member['id'] ?>" class="btn-edit">Edit</a>
                            <button onclick="deleteMember(<?= $member['id'] ?>)" class="btn-delete">Delete</button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            
            <!-- Pagination -->
            <div class="pagination">
                <?php for ($i = 1; $i <= $totalPages; $i++): ?>
                <a href="?page=<?= $i ?>&search=<?= urlencode($search) ?>&plan=<?= $planFilter ?>" 
                   class="<?= $i == $page ? 'active' : '' ?>">
                    <?= $i ?>
                </a>
                <?php endfor; ?>
            </div>
        </main>
    </div>
    
    <script>
    function deleteMember(id) {
        if (!confirm('Are you sure you want to delete this member?')) return;
        
        fetch('api/delete-member.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `id=${id}&csrf_token=<?= generateCSRFToken() ?>`
        })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                location.reload();
            } else {
                alert(data.message);
            }
        });
    }
    </script>
</body>
</html>