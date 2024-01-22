function deleteProduct(id) {
    const result = confirm('Are you sure you want to delete this job?');
    console.log(result);
    if (result) {
        fetch('/delete-job/' + id, {
            method: 'post'
        }).then((res) => {
            if (res.ok) {
                location.href="/jobs";
            }
        });
    }
}
function showLoginModal() {
    $('#login-modal').modal('show');
}

