<?php

ob_start(null, 0, PHP_OUTPUT_HANDLER_CLEANABLE ^ PHP_OUTPUT_HANDLER_REMOVABLE);
require_once('checkloggedin.php');
ob_end_clean();

require_once('config.php');

if (!empty($_SESSION['user_data']['trips_id'])) {
    $trips_id = intval($_SESSION['user_data']['trips_id']);
}

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

$query = "SELECT * FROM `pins` WHERE `trips_id` = $trips_id";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($result) === 0) {
    $output['success'] = true;
    $output['data'] = [];
    print(json_encode($output));
    exit();
}

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $latitude = intval($row['latitude']) / 10000000;
    $longitude = intval($row['longitude'])/ 10000000;
    $data[] = [
        'pin_id' => $row['id'],
        'lat' => $latitude,
        'lng' => $longitude,
        'description' => $row['description'],
        'name' => $row['name']
    ];
}

$output['success'] = true;
$output['data'] = $data;

print(json_encode($output));

?>
