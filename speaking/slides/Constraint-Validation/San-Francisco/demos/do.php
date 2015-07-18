<?
	$errors = array();

	if ( empty( $_POST[ "name" ] ) ) {
		array_push( $errors, "Name is required." );
	}
	if ( !isset( $_POST[ "terms" ] ) ) {
		array_push( $errors, "Please accept our terms of service." );
	}

	echo json_encode( $errors );
?>