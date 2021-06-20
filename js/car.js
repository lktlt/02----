$(function () {
    // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
    // 事件可以使用change
    $(".checkall").change(function () {
        // 
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");// 添加商品背景
        } else {
            $(".cart-item").removeClass("check-cart-item");// 移除商品背景
        }
    });
    // 如果3个小复选框都被选中，就把全选按钮选上，否则不选中
    $(".j-checkbox").change(function () {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");// 添加商品背景
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");// 添加商品背景
        }
    });
    // 增加商品数量模块，每次点击+，当前数量变量++，然后复制给文本框
    $(".increment").click(function () {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // 小计
        var price = $(this).parents(".p-num").siblings(".p-price").text();// 找到单价
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (n * price.substr(1)).toFixed(2));// 取数值计算
        getSum();
    })
    $(".decrement").click(function () {

        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        var price = $(this).parents(".p-num").siblings(".p-price").text();// 找到单价
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (n * price.substr(1)).toFixed(2));// 取数值计算
        getSum();
    })

    // 用户组直接输入商品数量
    $(".itxt").change(function () {
        var n = $(this).val();
        if (!n || n <= 0) {
            $(this).val("1");
            n = 1;
        }
        var price = $(this).parents(".p-num").siblings(".p-price").text();// 找到单价
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (n * price.substr(1)).toFixed(2));
        getSum();
    });
    getSum();
    //总结总额计算
    function getSum() {
        var count = 0;// 总件数
        var money = 0;//总价
        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        })
        $(".amount-sum em").text(count);
        $(".p-sum").each(function (i, ele) {
            var p = $(ele).text().substr(1);
            money += parseFloat(p);
        })
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    // 商品后面的删除按钮
    $(".p-action").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    // 小复选框选中的商品删除
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    // 删除全部
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    })
    // 添加商品选中背景
})