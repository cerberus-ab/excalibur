describe("Module: Structure", function() {

    describe("Инициализация модуля", function() {

        it("определен как 'E.Structure'", function() {
            assert.isDefined(E.Structure);
        });

    });

    describe("Бинарное дерево", function() {

        var BinaryTree = E.Structure.BinaryTree;

        it("базовый класс бинарного дерева", function() {
            assert.isFunction(BinaryTree);
        });

        var own_methods = ["traverse", "size", "keys", "values"];

        it("собственные методы: " + own_methods.join(", "), function() {
            own_methods.forEach(function(method) {
                assert.ownMethod(BinaryTree, method);
            });
        });

        describe("Бинарное дерево поиска", function() {

            var BinarySearchTree = E.Structure.BinarySearchTree,
                own_methods = ["find", "insert", "remove"],
                keys_test = [8,3,10,1,6,14,4,7,13];

            function createTree(keys) {
                return keys.reduce(function(tree, currentKey) {
                    return tree.insert(currentKey);
                }, new BinarySearchTree);
            }

            it("класс унаследован от базового", function() {
                assert.isFunction(BinarySearchTree);
                assert.isExtends(BinarySearchTree, BinaryTree);
            });

            it("собственные методы: " + own_methods.join(", "), function() {
                own_methods.forEach(function(method) {
                    assert.ownMethod(BinarySearchTree, method);
                });
            });

            it("создание экземпляра дерева [" + keys_test.toString()
                    + "]: корневой узел с ключом " + keys_test[0] + ", размер равен " + keys_test.length, function() {
                var tree = createTree(keys_test);
                assert.strictEqual(tree.constructor, BinarySearchTree);
                assert.strictEqual(tree._root.key, keys_test[0]);
                assert.strictEqual(tree.size(), keys_test.length);
                assert.strictEqual(tree.keys().toString(), "1,3,4,6,7,8,10,13,14", "wrong hierarchy");
            });

            it("удаление узла без потомков: ключ 1", function() {
                var tree = createTree(keys_test);
                tree.remove(1);
                assert.strictEqual(tree.keys().toString(), "3,4,6,7,8,10,13,14", "wrong hierarchy");
            });

            it("удаление узла с одним потомком: ключ 10", function() {
                var tree = createTree(keys_test);
                tree.remove(10);
                assert.strictEqual(tree.keys().toString(), "1,3,4,6,7,8,13,14", "wrong hierarchy");
            });

            it("удаление узла с двумя потомками: ключ 3", function() {
                var tree = createTree(keys_test);
                tree.remove(3);
                assert.strictEqual(tree.keys().toString(), "1,4,6,7,8,10,13,14", "wrong hierarchy");
            });

            it("удаление корневого узла с двумя потомками: ключ 8", function() {
                var tree = createTree(keys_test);
                tree.remove(8);
                assert.strictEqual(tree.keys().toString(), "1,3,4,6,7,10,13,14", "wrong hierarchy");
            });

            it("успешный поиск возвращает значение искомого узла", function() {
                var tree = createTree(keys_test);
                tree.insert(10, "somedata");
                assert.strictEqual(tree.find(10), "somedata");
            });

            it("безуспешный поиск возвращает undefined", function() {
                var tree = createTree(keys_test);
                assert.isUndefined(tree.find(20));
            });

        });

    });

});
