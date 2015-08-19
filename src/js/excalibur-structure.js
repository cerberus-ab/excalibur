/**
 * Модуль различных структур данных
 *
 */
!function(E) {

    var _structure = E.Structure = {};

    /**
     * Бинарное дерево =========================================================
     *
     */

    /**
     * @class Узел бинарного дерева
     * @param  {number} key ключ
     * @param  {object} value данные узла
     */
    function BinaryTreeNode(key, value) {
        this.key = key;
        this.value = typeof value !== "undefined" ? value : null;
        // ссылки на левый и правый узел
        this.left = null;
        this.right = null;
    };

    /**
     * @class Бинарное дерево
     */
    _structure.BinaryTree = function BinaryTree() {
        this._root = null;
    };

    /**
     * Обойти все узлы дерева
     * @param  {function} callback функция обратного вызова
     * @param  {string:[inorder, preorder, postorder]} order порядок обхода (Default: inorder)
     */
    _structure.BinaryTree.prototype.traverse = (function() {
        /**
         * Рекурсивные функции обхода дерева
         * @param {object} node узел дерева
         * @param {function} callback функция обратного вызова
         */
        var traverse_order = {
            // вершина, левое поддерево, правое поддерево
            preorder: function traverse(node, callback) {
                if (node) {
                    callback.call(this, node);
                    if (node.left !== null) {
                        traverse(node.left, callback);
                    }
                    if (node.right !== null) {
                        traverse(node.right, callback);
                    }
                }
            },
            // левое поддерево, вершина, правое поддерево
            inorder: function traverse(node, callback) {
                if (node) {
                    if (node.left !== null) {
                        traverse(node.left, callback);
                    }
                    callback.call(this, node);
                    if (node.right !== null) {
                        traverse(node.right, callback);
                    }
                }
            },
            // левое поддерево, правое поддерево, вершина
            postorder: function traverse(node, callback) {
                if (node) {
                    if (node.left !== null) {
                        traverse(node.left, callback);
                    }
                    if (node.right !== null) {
                        traverse(node.right, callback);
                    }
                    callback.call(this, node);
                }
            }
        };
        // вернуть метод класса
        return function(callback, order) {
            traverse_order[order || "inorder"](this._root, callback);
        }
    })();

    /**
     * Получить количество элементов в дереве
     * @return {number:integer} количество элементов
     */
    _structure.BinaryTree.prototype.length = function() {
        var length = 0;
        this.traverse(function(node) {
            length++;
        });
        return length;
    };

    /**
     * Получить массив ключей дерева
     * @param  {string:[inorder, preorder, postorder]} order порядок обхода (Default: inorder)
     * @return {array} массив ключей дерева
     */
    _structure.BinaryTree.prototype.keys = function(order) {
        var array = [];
        this.traverse(function(node) {
            array.push(node.key);
        }, order);
        return array;
    };

    /**
     * Преобразовать дерево в массив
     * @param  {string:[inorder, preorder, postorder]} order порядок обхода (Default: inorder)
     * @return {array} массив элементов дерева
     */
    _structure.BinaryTree.prototype.values = function(order) {
        var array = [];
        this.traverse(function(node) {
            array.push(node.value);
        }, order);
        return array;
    };

    /**
     * Бинарное дерево поиска ==================================================
     *
     */

    /**
     * @class Узел бинарного дерева поиска
     * @extends {BinaryTreeNode}
     * @param  {number} key ключ
     * @param  {object} value данные узла
     */
    function BinarySearchTreeNode(key, value) {
        BinarySearchTreeNode.superclass.constructor.call(this, key, value);
    };
    E.Class.extend(BinarySearchTreeNode, BinaryTreeNode);

    /**
     * @class Бинарное дерево поиска
     * @extends {BinaryTree}
     */
    _structure.BinarySearchTree = function BinarySearchTree() {
        BinarySearchTree.superclass.constructor.call(this);
    };
    E.Class.extend(_structure.BinarySearchTree, _structure.BinaryTree);

    /**
     * Поиск узла дерева
     * @param  {number} key ключ
     * @return {object} данные узла
     */
    _structure.BinarySearchTree.prototype.find = function(key) {
        var found = false,
            current = this._root;
        while (!found && current) {
            if (key < current.key) {
                current = current.left;
            }
            else if (key > current.key) {
                current = current.right;
            }
            else {
                found = true;
            }
        }
        return !found ? undefined : current.value;
    };

    /**
     * Добавить новый узел в дерево
     * @param {number} key ключ
     * @param {object} value данные узла
     */
    _structure.BinarySearchTree.prototype.insert = function(key, value) {
        // инициализация нового узла
        var node = new BinarySearchTreeNode(key, value);
        // если корневой отсутствует, то добавить как корневой
        if (this._root === null){
            this._root = node;
        // иначе поиск подходящего места в дереве
        } else {
            var current = this._root;
            while (1) {
                // если ключ меньше текущего, то левое поддерево
                if (key < current.key) {
                    if (current.left === null) {
                        current.left = node;
                        break;
                    }
                    else {
                        current = current.left;
                    }
                }
                // иначе если ключ больше текущего, то правое
                else if (key > current.key) {
                    if (current.right === null) {
                        current.right = node;
                        break;
                    }
                    else {
                        current = current.right;
                    }
                }
                // иначе изменить данные текущего узла
                else {
                    current.value = node.value;
                    break;
                }
            }
        }
    };

    /**
     * Удалить узел по указанному ключу
     * @param  {number} key ключ
     */
    _structure.BinarySearchTree.prototype.remove = function(key) {
        var found = false,
            current = this._root,
            parent = null;
        // поиск указанного узла
        while (!found && current) {
            if (key < current.key){
                parent = current;
                current = current.left;
            }
            else if (key > current.key) {
                parent = current;
                current = current.right;
            }
            else {
                found = true;
            }
        }
        // если узел найден, то продолжить
        if (found) {
            // определить конечный рабочий узел
            var target = current === this._root ? this._root
                : parent[current.key < parent.key ? "left" : "right"];
            // в зависимости от количества детей
            switch (!!current.left + !!current.right) {
                case 0:
                    target = null;
                    break;
                case 1:
                    target = current.left || current.right;
                    break;
                case 2:
                    var replace = current.right,
                        replace_parent = null;
                    // найти крайний левый узел в правом поддереве
                    while (replace.left !== null) {
                        replace_parent = replace;
                        replace = replace.left;
                    }
                    // если он имеется, то копировать его данные в целевой узел и удалить
                    if (replace_parent !== null) {
                        replace_parent.left = replace.right;
                        replace.left = current.left;
                        replace.right = current.right;
                    }
                    // иначе просто свдинуть правое поддерево
                    else {
                        replace.left = current.left;
                    }
                    target = replace;
                    break;
                // no default
            }
        }
    };

}(Excalibur);
