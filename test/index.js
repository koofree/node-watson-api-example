[
    './read_train_test',
    './watson_classifier_test'
]

    .forEach(function (filepath) {
        require(filepath)();
    });
