/**
 * Модуль различных структур данных
 *
 */
!function(E) {

    var _structure = E.Structure = {};

    /**
     * @class Бинарное дерево поиска
     */
    _structure.BinarySearchTree = function() {
        this._root = null;
    };

    /**
     * Поиск узла дерева
     * @param  {number} key ключ
     * @return {object} данные узла
     */
    _structure.BinarySearchTree.prototype.find = function(key) {
        var found,
            current = this._root;
        while (!found && current) {
            if (key < current.key) {
                current = current.left;
            }
            else if (key > current.key) {
                current = current.right;
            }
            else {
                found = current.data;
            }
        }
        return found;
    };

    /**
     * Добавить новый узел в дерево
     * @param {number} key ключ
     * @param {object} data данные узла
     */
    _structure.BinarySearchTree.prototype.insert = function(key, data) {
        // инициализация нового узла
        var node = {
            key: key,
            data: typeof data !== "undefined" ? data : null,
            left: null,
            right: null
        };
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
                    current.data = node.data;
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
            // количество детей
            var cham = !!current.left + !!current.right,
                replace,
                replace_parent = null;

            // если указанный узел является корневым, то особая обработка
            if (current === this._root) {
                switch (cham) {
                    case 0:
                        this._root = null;
                        break;
                    case 1:
                        this._root = current.left || current.right;
                        break;
                    case 2:
                        // найти крайний левый узел в правом поддереве
                        replace = current.right;
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
                        current = replace;
                        break;
                    // no default
                }
            }
            // иначе обычный узел
            else {
                switch (cham) {
                    case 0:
                        parent[current.key < parent.key ? "left" : "right"] = null;
                        break;
                    case 1:
                        parent[current.key < parent.key ? "left" : "right"] = current.left || current.right;
                        break;
                    case 2:
                        // найти крайний левый узел в правом поддереве
                        replace = current.right;
                        while (replace.left !== null) {
                            replace_parent = replace;
                            replace = replace.left;
                        }
                        // если он имеется, то копировать его данные в целевой узел и удалить
                        if (replace_parent) {
                            replace_parent.left = replace.right;
                            replace.left = current.left;
                            replace.right = current.right;
                        }
                        // иначе просто свдинуть правое поддерево
                        else {
                            replace.left = current.left;
                        }
                        parent[current.key < parent.key ? "left" : "right"] = replace;
                        break;
                    // no default
                }
            }
        }
    };

    /**
     * Обойти все узлы дерева
     * @param  {function} callback функция обратного вызова
     * @param  {string:[inorder, preorder, postorder]} order порядок обхода (Default: inorder)
     */
    _structure.BinarySearchTree.prototype.traverse = (function() {
        /**
         * Рекурсивные функции обхода дерева
         * @param {object} node узел дерева
         * @param {function} callback функция обратного вызова
         */
        var traverse_order = {
            // вершина, левое поддерево, правое поддерево
            preorder: function(node, callback) {
                if (node) {
                    callback.call(this, node);
                    if (node.left !== null) {
                        preorder(node.left, callback);
                    }
                    if (node.right !== null) {
                        preorder(node.right, callback);
                    }
                }
            },
            // левое поддерево, вершина, правое поддерево
            inorder: function(node, callback) {
                if (node) {
                    if (node.left !== null) {
                        inorder(node.left, callback);
                    }
                    callback.call(this, node);
                    if (node.right !== null) {
                        inorder(node.right, callback);
                    }
                }
            },
            // левое поддерево, правое поддерево, вершина
            postorder: function(node, callback) {
                if (node) {
                    if (node.left !== null) {
                        postorder(node.left, callback);
                    }
                    if (node.right !== null) {
                        postorder(node.right, callback);
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
    _structure.BinarySearchTree.prototype.size = function() {
        var length = 0;
        this.traverse(function(node) {
            length++;
        });
        return length;
    };

    /**
     * Преобразовать дерево в массив
     * @param  {string:[inorder, preorder, postorder]} order порядок обхода (Default: inorder)
     * @return {array} массив элементов дерева
     */
    _structure.BinarySearchTree.prototype.toArray = function(order) {
        var array = [];
        this.traverse(function(node) {
            array.push(node.data);
        }, order);
        return array;
    };

}(Excalibur);
