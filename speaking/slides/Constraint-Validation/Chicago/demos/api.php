<?
	$nameErrors = array();
	$emailErrors = array();

	if ( empty( $_POST[ "name" ] ) ) {
		array_push( $nameErrors, "Name is required." );
	}
	if ( empty( $_POST[ "email" ] ) ) {
		array_push( $emailErrors, "Email address is required." );
	} else {
		if ( !filter_var( $_POST[ "email" ], FILTER_VALIDATE_EMAIL ) ) {
			array_push( $emailErrors, "Email address is invalid." );
		}
	}

	$errors = array(
		"name" => $nameErrors,
		"email" => $emailErrors
	);

	if ( count( $nameErrors ) > 0 || count( $emailErrors ) > 0 ) {
		header( "Content-Type: application/json" );
		http_response_code( 400 );
		echo json_encode( array( "errors" => $errors ) );
	} else {
		// Insert your "real" response here.
		echo json_encode( "{}" );
	}
?>