describe("Module: Structure", function() {

    describe("Инициализация модуля", function() {

        it("определен как 'E.Structure'", function() {
            assert.isDefined(E.Structure);
        });

    });

    describe("Бинарное дерево", function() {

        it("определен базовый класс бинарного дерева", function() {
            assert.isFunction(E.Structure.BinaryTree);
        });

        describe("Бинарное дерево поиска", function() {

            it("класс унаследован от базового", function() {
                assert.isFunction(E.Structure.BinarySearchTree);
                assert.strictEqual(E.Structure.BinarySearchTree.superclass, E.Structure.BinaryTree.prototype);
            });

        });

    });

});
